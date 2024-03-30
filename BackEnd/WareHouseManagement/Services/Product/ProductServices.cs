using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;
using WareHouseManagement.Models.DTO.Product;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Product.Interfaces;

namespace WareHouseManagement.Services.Product
{
	public class ProductServices : IProductServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public ProductServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}

		public async Task<ApiResponse<GetProductResponseDTO>> GetProducts()
		{
			ApiResponse<GetProductResponseDTO> res = new();

			//lưu trữ các sản phẩm mà không lặp lại
			var productsInDb = await _unitOfWork.Product.GetAll().ToListAsync();

			// Duyệt qua các sản phẩm để cập nhật số lượng trong kho
			foreach (var p in productsInDb)
			{
				int totalIn = await _unitOfWork.NoteItem.Get(x => x.ProductId == p.Id && x.Note.NoteCode.StartsWith("NK"), true)
					.Include(x => x.Note)
					.SumAsync(x => x.Quantity);

				int totalOut = await _unitOfWork.NoteItem.Get(x => x.ProductId == p.Id && x.Note.NoteCode.StartsWith("XK"), true)
					.Include(x => x.Note)
					.SumAsync(x => x.Quantity);

				p.QuantityInWareHouse = totalIn - totalOut;
			}

			res.Result.Products = productsInDb.ToList();
			res.Result.ProductTypes = await _unitOfWork.ProductType.GetAll().ToListAsync();
			return res;
		}

		public async Task<ApiResponse<GetProductResponseDTO>> GetProductInWareHouses(int whId)
		{
			ApiResponse<GetProductResponseDTO> res = new ApiResponse<GetProductResponseDTO>();

			//lưu trữ các sản phẩm mà không lặp lại
			var products = new List<Models.Product>();

			var inNotes = await _unitOfWork.Note.Get(x => x.WareHouseId == whId && x.NoteCode.Contains("NK"), true)
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

		public async Task<ApiResponse<object>> AddProduct(AddOrUpdateProductRequestDTO model)
		{
			if (model.ProductTypeId == 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductTypeId), new List<string> { $"Chọn mã loại hàng." } }
					};
				return _res;
			}

			var productInDb = await _unitOfWork.Product.Get(x => x.ProductCode.Equals(model.ProductCode), true).FirstOrDefaultAsync();

			if (productInDb != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductCode), new List<string> { $"Trùng mã hàng." } }
					};
				return _res;
			}

			var productInDbWithName = await _unitOfWork.Product.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (productInDbWithName != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên hàng." } }
					};
				return _res;
			}

			Models.Product newProduct = new()
			{
				ProductCode = model.ProductCode,
				Name = model.Name,
				Price = model.Price,
				Unit = model.Unit,
				Status = model.Status,
				Des = model.Des,
				ProductTypeId = model.ProductTypeId,
			};

			_unitOfWork.Product.Add(newProduct);
			_unitOfWork.Save();

			_res.Messages = "Đã thêm hàng thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateProduct(int pId, AddOrUpdateProductRequestDTO model)
		{
			if (model.ProductTypeId == 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductTypeId), new List<string> { $"Chọn mã loại hàng." } }
					};
				return _res;
			}

			var productInDbWithId = await _unitOfWork.Product.Get(x => x.Id == pId, true).FirstOrDefaultAsync();

			if (productInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ nameof(model.ProductCode), new List<string> { $"Không tìm thấy hàng." } }
					};
				return _res;
			}

			var productInDbWithCode = await _unitOfWork.Product.Get(x => x.ProductCode.Equals(model.ProductCode), true).FirstOrDefaultAsync();

			if (productInDbWithCode != null && productInDbWithCode.Id != productInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.ProductCode), new List<string> { $"Trùng mã hàng." } }
					};
				return _res;
			}

			var productInDbWithName = await _unitOfWork.Product.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (productInDbWithName != null && productInDbWithName.Id != productInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên hàng." } }
					};
				return _res;
			}

			productInDbWithId.ProductCode = model.ProductCode;
			productInDbWithId.Name = model.Name;
			productInDbWithId.Price = model.Price;
			productInDbWithId.Unit = model.Unit;
			productInDbWithId.Des = model.Des;
			productInDbWithId.ProductTypeId = model.ProductTypeId;

			_unitOfWork.Product.Update(productInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã cập nhật hàng thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteProduct(int pId)
		{
			var productInDbWithId = await _unitOfWork.Product.Get(x => x.Id == pId, true).FirstOrDefaultAsync();

			if (productInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "pId", new List<string> { $"Không tìm thấy hàng." } }
					};
				return _res;
			}

			_unitOfWork.Product.Remove(productInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã xóa hàng thành công.";
			return _res;
		}


	}
}
