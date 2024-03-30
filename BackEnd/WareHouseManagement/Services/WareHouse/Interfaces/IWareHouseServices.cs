using WareHouseManagement.Models.DTO.WH;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.WareHouse.Interfaces
{
	public interface IWareHouseServices
	{
		public Task<ApiResponse<GetWareHouseResponseDTO>> GetWareHouses();
		public Task<ApiResponse<object>> AddWareHouse(AddOrUpdateWareHouseRequestDTO model);
		public Task<ApiResponse<object>> UpdateWareHouse(int id, AddOrUpdateWareHouseRequestDTO model);
		public Task<ApiResponse<object>> DeleteWareHouse(int id);
	}
}
