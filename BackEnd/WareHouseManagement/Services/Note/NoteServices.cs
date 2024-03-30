using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models.DTO.Note;
using WareHouseManagement.Models.DTO.Product;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Note.Interfaces;

namespace WareHouseManagement.Services.Note
{
	public class NoteServices : INoteServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public NoteServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}

		public async Task<ApiResponse<GetInOutNotesResponseDTO>> GetInOutNotesAsync()
		{
			ApiResponse<GetInOutNotesResponseDTO> res = new();

			var notes = await _unitOfWork.Note.Get(x => x.NoteCode.Contains("NK") || x.NoteCode.Contains("XK"), true)
				.Include(x => x.WareHouse)
				.Include(x => x.Customer)
				.Include(x => x.User)
				.Include(x => x.NoteItems)
				.ThenInclude(x => x.Product)
				.ToListAsync();

			// Map thông tin email từ User vào cột Email của WareHouse
			foreach (var note in notes)
			{
				note.WareHouseName = note.WareHouse?.Name ?? string.Empty;
				note.CustomerName = note.Customer?.Name ?? string.Empty;
				note.UserName = note.User?.Email ?? string.Empty;

				note.Total = note.NoteItems.Sum(x => x.Quantity * x.Price);
			}

			res.Result.Notes = notes;
			return res;
		}

		public async Task<ApiResponse<GetInOutNotesResponseDTO>> GetInventoryNotesAsync()
		{
			ApiResponse<GetInOutNotesResponseDTO> res = new();

			var notes = await _unitOfWork.Note.Get(x => x.NoteCode.Contains("KK"), true)
				.Include(x => x.WareHouse)
				.Include(x => x.Customer)
				.Include(x => x.User)
				.Include(x => x.NoteItems)
				.ThenInclude(x => x.Product)
				.ToListAsync();

			// Map thông tin email từ User vào cột Email của WareHouse
			foreach (var note in notes)
			{
				note.WareHouseName = note.WareHouse?.Name ?? string.Empty;
				note.CustomerName = note.Customer?.Name ?? string.Empty;
				note.UserName = note.User?.Email ?? string.Empty;

				note.Total = note.NoteItems.Sum(x => x.Quantity * x.Price);
			}

			res.Result.Notes = notes;
			return res;
		}

		public async Task<ApiResponse<GetInOutNoteResponseDTO>> GetInOutNoteAsync(int noteId)
		{
			ApiResponse<GetInOutNoteResponseDTO> res = new();

			if (noteId <= 0)
			{
				res.IsSuccess = false;
				res.Errors = new Dictionary<string, List<string>>
				{
						{"id", new List<string> { $"Sai id." } }
					};
				return res;
			}


			var note = await _unitOfWork.Note.Get(x => x.Id == noteId, true)
				.Include(x => x.WareHouse)
				.Include(x => x.Customer)
				.Include(x => x.User)
				.Include(x => x.NoteItems)
				.ThenInclude(x => x.Product)
				.FirstOrDefaultAsync();

			if (note == null)
			{
				res.IsSuccess = false;
				res.Errors = new Dictionary<string, List<string>>
				{
						{"id", new List<string> { $"Không tìm thấy phiếu." } }
					};
				return res;
			}

			note.WareHouseName = note.WareHouse?.Name ?? string.Empty;
			note.CustomerName = note.Customer?.Name ?? string.Empty;
			note.UserName = note.User?.Email ?? string.Empty;

			note.Total = note.NoteItems.Sum(x => x.Quantity * x.Price);

			var products = note.NoteItems
			   .Select(noteItem => noteItem.Product) // Lấy sản phẩm từ mỗi NoteItem
			   .Distinct() // Loại bỏ các sản phẩm trùng lặp
			   .ToList();

			// Tính tổng số lượng của từng sản phẩm trong ghi chú
			Dictionary<int, int> productQuantities = note.NoteItems
				.GroupBy(item => item.ProductId)
				.ToDictionary(group => group.Key, group => group.Sum(item => item.Quantity));

			// Gán số lượng của từng sản phẩm vào danh sách sản phẩm
			foreach (var product in products)
			{
				if (productQuantities.ContainsKey(product.Id))
				{
					product.QuantityInWareHouse = productQuantities[product.Id];
					product.Price = productQuantities[product.Id];
				}
				else
				{
					// Nếu không có số lượng cho sản phẩm này, gán số lượng là 0
					product.QuantityInWareHouse = 0;
				}
			}

			if (note.NoteCode.Contains("XK"))
			{
				foreach (var product in products)
				{
					double productPrice = note.NoteItems
						.Where(item => item.ProductId == product.Id) 
						.Select(item => item.Price)
						.FirstOrDefault();

					product.Price = productPrice;
				}
			}

			res.Result.Products = products;
			res.Result.Note = note;
			return res;
		}

		public async Task<ApiResponse<object>> AddInOutNoteAsync(AddInOutNoteRequestDTO model)
		{
			if (!model.NoteCode.Contains("NK") && !model.NoteCode.Contains("XK") && !model.NoteCode.Contains("KK"))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.NoteCode), new List<string> { $"Nhập mã phiếu với NK, XK hoặc KK." } }
					};
				return _res;
			}

			if (model.CustomerId == 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.CustomerId), new List<string> { $"Chọn khách hàng." } }
					};
				return _res;
			}

			if (model.WareHouseId == 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.WareHouseId), new List<string> { $"Chọn kho." } }
					};
				return _res;
			}

			if (model.ProductList.Count <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductList), new List<string> { $"Thêm hàng hóa." } }
					};
				return _res;
			}

			var noteInDbWithCode = await _unitOfWork.Note.Get(x => x.NoteCode.Contains(model.NoteCode), true).FirstOrDefaultAsync();

			if (noteInDbWithCode != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.NoteCode), new List<string> { $"Trùng tên phiếu." } }
					};
				return _res;
			}

			Models.Note newNote = new();
			if (model.NoteCode.Contains("KK"))
			{
				//phiếu kiểm kê
				newNote.WareHouseId = 1;
				newNote.CustomerId = 1;
			}
			else
			{
				//phiếu nhập xuất
				newNote.WareHouseId = model.WareHouseId;
				newNote.CustomerId = model.CustomerId;
			}
			newNote.NoteCode = model.NoteCode;
			newNote.NoteDate = model.NoteDate;
			newNote.Des = model.Des;
			newNote.UserId = model.UserId;

			_unitOfWork.Note.Add(newNote);
			_unitOfWork.Save();

			foreach (var item in model.ProductList)
			{
				if (item.ProductId > 0)
				{
					Models.NoteItem newNoteItem = new()
					{
						Price = item.Price,
						Quantity = item.Quantity,
						ProductId = item.ProductId,
						NoteId = newNote.Id,
					};
					_unitOfWork.NoteItem.Add(newNoteItem);
				}
			}
			_unitOfWork.Save();

			_res.Messages = "Đã thêm phiếu kho thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateInOutNoteAsync(int noteId, AddInOutNoteRequestDTO model)
		{
			if (noteId <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.CustomerId), new List<string> { $"Sai id." } }
					};
				return _res;
			}

			if (model.CustomerId <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.CustomerId), new List<string> { $"Chọn khách hàng." } }
					};
				return _res;
			}

			if (model.WareHouseId <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.WareHouseId), new List<string> { $"Chọn kho." } }
					};
				return _res;
			}

			if (model.ProductList.Count <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductList), new List<string> { $"Thêm hàng hóa." } }
					};
				return _res;
			}

			var noteInDbWithId = await _unitOfWork.Note.Get(x => x.Id == noteId, true).FirstOrDefaultAsync();

			if (noteInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.NoteCode), new List<string> { $"Không tìm thấy phiếu." } }
					};
				return _res;
			}

			var noteInDbWithCode = await _unitOfWork.Note.Get(x => x.NoteCode.Contains(model.NoteCode), true).FirstOrDefaultAsync();

			if (noteInDbWithCode != null && noteInDbWithCode.Id != noteInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.NoteCode), new List<string> { $"Trùng tên phiếu." } }
					};
				return _res;
			}

			noteInDbWithId.NoteCode = model.NoteCode;
			noteInDbWithId.NoteDate = model.NoteDate;
			noteInDbWithId.Des = model.Des;
			noteInDbWithId.WareHouseId = model.WareHouseId;
			noteInDbWithId.CustomerId = model.CustomerId;
			noteInDbWithId.UserId = model.UserId;

			_unitOfWork.Note.Update(noteInDbWithId);
			_unitOfWork.Save();

			var noteItemsInDb = await _unitOfWork.NoteItem.Get(x => x.NoteId == noteId, true).ToListAsync();

			_unitOfWork.NoteItem.RemoveRange(noteItemsInDb);
			_unitOfWork.Save();

			foreach (var item in model.ProductList)
			{
				if (item.ProductId > 0)
				{
					Models.NoteItem newNoteItem = new()
					{
						Price = item.Price,
						Quantity = item.Quantity,
						ProductId = item.ProductId,
						NoteId = noteInDbWithId.Id,
					};
					_unitOfWork.NoteItem.Add(newNoteItem);
				}
			}
			_unitOfWork.Save();

			_res.Messages = "Đã cập nhật phiếu kho thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteNoteAsync(int noteId)
		{
			if (noteId <= 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{"id", new List<string> { $"Sai id." } }
					};
				return _res;
			}

			var noteInDb = await _unitOfWork.Note
				.Get(x => x.Id == noteId, true)
				.FirstOrDefaultAsync();

			if (noteInDb == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{"id", new List<string> { $"Không tìm thấy phiếu." } }
					};
				return _res;
			}

			_unitOfWork.Note.Remove(noteInDb);
			_unitOfWork.Save();

			_res.Messages = $"Đã xóa phiếu {noteInDb.NoteCode} thành công";
			return _res;
		}

		public async Task<ApiResponse<GetCheckInventoryRequestDTO>> GetCheckInventoryProductsAsync()
		{
			ApiResponse<GetCheckInventoryRequestDTO> res = new();

			//lưu trữ các sản phẩm mà không lặp lại
			var products = new List<Models.Product>();

			var inNotes = await _unitOfWork.Note.Get(x => x.NoteCode.Contains("NK"), true)
												.Include(x => x.NoteItems)
												.ThenInclude(x => x.Product)
												.ToListAsync();

			foreach (var note in inNotes)
			{
				// Duyệt qua các mặt hàng trong phiếu nhập
				foreach (var item in note.NoteItems)
				{
					if (!products.Any(p => p.Id == item.ProductId))
					{
						products.Add(item.Product);
					}
				}
			}

			// Duyệt qua các sản phẩm để cập nhật số lượng trong kho
			foreach (var p in products)
			{
				int totalIn = await _unitOfWork.NoteItem.Get(x => x.ProductId == p.Id && x.Note.NoteCode.StartsWith("NK"), true)
					.Include(x => x.Note)
					.SumAsync(x => x.Quantity);

				int totalOut = await _unitOfWork.NoteItem.Get(x => x.ProductId == p.Id && x.Note.NoteCode.StartsWith("XK"), true)
					.Include(x => x.Note)
					.SumAsync(x => x.Quantity);

				p.QuantityInWareHouse = totalIn - totalOut;
			}

			res.Result.Products = products.ToList();

			return res;
		}
	}
}
