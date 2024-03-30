using WareHouseManagement.Models.DTO.Product;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Product.Interfaces
{
	public interface IProductServices
	{
		public Task<ApiResponse<GetProductResponseDTO>> GetProducts();
		public Task<ApiResponse<GetProductResponseDTO>> GetProductInWareHouses(int whId);
		public Task<ApiResponse<object>> AddProduct(AddOrUpdateProductRequestDTO model);
		public Task<ApiResponse<object>> UpdateProduct(int pId, AddOrUpdateProductRequestDTO model);
		public Task<ApiResponse<object>> DeleteProduct(int pId);
	}
}
