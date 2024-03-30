using WareHouseManagement.Models.DTO.ProductType;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.ProductType.Interfaces
{
	public interface IProductTypeServices
	{
		public Task<ApiResponse<GetProductTypesResponseDTO>> GetProductTypes();
		public Task<ApiResponse<object>> AddProductType(AddOrUpdateProductTypeRequestDTO model);
		public Task<ApiResponse<object>> UpdateProductType(int pId, AddOrUpdateProductTypeRequestDTO model);
		public Task<ApiResponse<object>> DeleteProductType(int pId);
	}
}
