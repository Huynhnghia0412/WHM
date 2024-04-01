using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models.DTO.Report;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Report.Interfaces;

namespace WareHouseManagement.Services.Report
{
	public class ReportServices : IReportServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public ReportServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}

		public async Task<ApiResponse<GetInventoryReportResponseDTO>> GetInOutReportAsync(SearchInventoryReportRequestDTO model)
		{
			ApiResponse<GetInventoryReportResponseDTO> res = new();

			// Khởi tạo danh sách sản phẩm
			var products = new List<Models.Product>();

			// Kiểm tra xem model có chứa dữ liệu từ ngày và đến ngày không
			if (model.FromDate != null && model.ToDate != null)
			{
				// Lấy tất cả các phiếu nhập trong khoảng thời gian từ FromDate đến ToDate
				var inNotes = await _unitOfWork.Note
					.Get(x => x.NoteDate >= model.FromDate && x.NoteDate <= model.ToDate && x.NoteCode.ToUpper().StartsWith("NK"), true)
					.Include(x => x.NoteItems)
					.ThenInclude(x => x.Product)
					.ToListAsync();

				// Duyệt qua các phiếu nhập để lấy thông tin sản phẩm
				foreach (var note in inNotes)
				{
					foreach (var item in note.NoteItems)
					{
						// Kiểm tra xem sản phẩm đã được thêm vào danh sách chưa
						if (!products.Any(p => p.Id == item.ProductId))
						{
							products.Add(item.Product);
						}
					}
				}

				if (!string.IsNullOrEmpty(model.ProductNameOrCode))
				{
					products = products.Where(x => x.Name.ToLower().Contains(model.ProductNameOrCode.ToLower()) ||
												   x.ProductCode.ToLower().Contains(model.ProductNameOrCode.ToLower()))
									   .ToList();
				}

				// Lọc theo loại sản phẩm nếu có
				if (model.ProductTypeId > 0)
				{
					products = products.Where(x => x.ProductTypeId == model.ProductTypeId).ToList();
				}


				// Duyệt qua các sản phẩm để tính toán số lượng trong kho
				foreach (var p in products)
				{
					int totalIn = await _unitOfWork.NoteItem
						.Get(x => x.ProductId == p.Id && x.Note.NoteCode.ToUpper().StartsWith("NK") && x.Note.NoteDate >= model.FromDate && x.Note.NoteDate <= model.ToDate, true)
						.SumAsync(x => x.Quantity);

					int totalOut = await _unitOfWork.NoteItem
						.Get(x => x.ProductId == p.Id && x.Note.NoteCode.ToUpper().StartsWith("XK") && x.Note.NoteDate >= model.FromDate && x.Note.NoteDate <= model.ToDate, true)
						.SumAsync(x => x.Quantity);

					p.QuantityInWareHouse = totalIn - totalOut;
					res.Result.TotalQuantity += p.QuantityInWareHouse;
					res.Result.TotalValue += p.QuantityInWareHouse * p.Price;

					p.QuantityIn = totalIn;
					p.QuantityOut = totalOut;
					p.TotalValueIn = totalIn * p.Price;
					p.TotalValueOut = totalOut * p.Price;
				}
			}

			res.Result.Products = products.OrderBy(x => x.Id).ToList();
			return res;
		}

		public async Task<ApiResponse<GetRevenueReportResponseDTO>> GetCustomerRevenueReportAsync(SearchCustomerRevenueReportRequestDTO model)
		{
			ApiResponse<GetRevenueReportResponseDTO> res = new();

			if (model.CustomerId <= 0)
			{
				res.IsSuccess = false;
				res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.CustomerId), new List<string> { $"Vui lòng chọn khách hàng." } }
					};
				return res;
			}

			var outSum = await _unitOfWork.Note
				.Get(x => x.NoteDate >= model.FromDate && x.NoteDate <= model.ToDate && x.NoteCode.ToUpper().StartsWith("XK")
				&& x.CustomerId == model.CustomerId, true)
				.Include(x => x.NoteItems)
				.SelectMany(x => x.NoteItems)
				.SumAsync(x => x.Quantity * x.Price);

			res.Result.Customer = await _unitOfWork.Customer.Get(x => x.Id == model.CustomerId, true).FirstOrDefaultAsync();
			res.Result.Revenue = outSum;
			return res;
		}

		public async Task<ApiResponse<GetRevenueReportResponseDTO>> GetRevenueReportAsync(SearchRevenueReportRequestDTO model)
		{
			ApiResponse<GetRevenueReportResponseDTO> res = new ApiResponse<GetRevenueReportResponseDTO>();

			// Tính tổng doanh thu từ các ghi chú xuất ("XK") trong khoảng thời gian chỉ định
			var outSum = await _unitOfWork.Note
				.Get(x => x.NoteDate >= model.FromDate && x.NoteDate <= model.ToDate && x.NoteCode.ToUpper().StartsWith("XK"), true)
				.Include(x => x.NoteItems)
				.SelectMany(x => x.NoteItems)
				.SumAsync(x => x.Quantity * x.Price);

			res.Result.Revenue = outSum;

			return res;
		}

	}
}
