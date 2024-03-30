using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Models.DTO.ProductType;
using Microsoft.EntityFrameworkCore;
using WareHouseManagement.Services.ProductType.Interfaces;

namespace WareHouseManagement.Services.ProductType
{
	public class ProductTypeServices : IProductTypeServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public ProductTypeServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}

		public async Task<ApiResponse<GetProductTypesResponseDTO>> GetProductTypes()
		{
			ApiResponse<GetProductTypesResponseDTO> res = new();

			res.Result.ProductTypes = await _unitOfWork.ProductType.GetAll().ToListAsync();
			return res;
		}

		public async Task<ApiResponse<object>> AddProductType(AddOrUpdateProductTypeRequestDTO model)
		{
			var productTypeInDbWithCode = await _unitOfWork.ProductType.Get(x => x.ProductTypeCode.Equals(model.ProductTypeCode), true).FirstOrDefaultAsync();

			if (productTypeInDbWithCode != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.ProductTypeCode), new List<string> { $"Trùng mã loại hàng." } }
					};
				return _res;
			}

			var productTypeInDbWithName = await _unitOfWork.ProductType.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (productTypeInDbWithName != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên loại hàng." } }
					};
				return _res;
			}

			Models.ProductType newProductType = new()
			{
				ProductTypeCode = model.ProductTypeCode,
				Name = model.Name,
				Detail = model.Detail,
			};

			_unitOfWork.ProductType.Add(newProductType);
			_unitOfWork.Save();

			_res.Messages = "Đã thêm loại hàng thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateProductType(int pId, AddOrUpdateProductTypeRequestDTO model)
		{
			var productTypeInDbWithId = await _unitOfWork.ProductType.Get(x => x.Id == pId, true).FirstOrDefaultAsync();

			if (productTypeInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "pId", new List<string> { $"Không tìm thấy loại hàng." } }
					};
				return _res;
			}

			var productTypeInDbWithName = await _unitOfWork.ProductType.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (productTypeInDbWithName != null && productTypeInDbWithName.Id != productTypeInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên loại hàng." } }
					};
				return _res;
			}

			var productTypeInDbWithCode = await _unitOfWork.ProductType.Get(x => x.ProductTypeCode.Equals(model.ProductTypeCode), true).FirstOrDefaultAsync();

			if (productTypeInDbWithCode != null && productTypeInDbWithCode.Id != productTypeInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.ProductTypeCode), new List<string> { $"Trùng mã loại hàng." } }
					};
				return _res;
			}

			productTypeInDbWithId.ProductTypeCode = model.ProductTypeCode;
			productTypeInDbWithId.Name = model.Name;
			productTypeInDbWithId.Detail = model.Detail;

			_unitOfWork.ProductType.Update(productTypeInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã cập nhật loại hàng thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteProductType(int pId)
		{
			var productTypeInDbWithId = await _unitOfWork.ProductType.Get(x => x.Id == pId, true).Include(x => x.Products).FirstOrDefaultAsync();

			if (productTypeInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không tìm thấy loại hàng." } }
					};
				return _res;
			}

			if (productTypeInDbWithId.Products != null && productTypeInDbWithId.Products.Count() > 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không thể xóa loại hàng vì đã được thêm vào trong hàng hóa." } }
					};
				return _res;
			}

			_unitOfWork.ProductType.Remove(productTypeInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã xóa loại hàng thành công.";
			return _res;
		}
	}
}
