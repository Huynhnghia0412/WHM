using WareHouseManagement.Models.DTO.User;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.User.Interfaces
{
	public interface IUserServices
	{
		// User
		public Task<ApiResponse<GetUsersResponseDTO>> GetEmployeesAsync();
		public Task<ApiResponse<object>> AddUserAsync(AddUserRequestDTO model);
		public Task<ApiResponse<object>> UpdateUserAsync(string roleId, UpdateUserRequestDTO model);
		public Task<ApiResponse<object>> DeleteUserAsync(string roleId);


		// Role
		public Task<ApiResponse<GetRolesResponseDTO>> GetRolesAsync();
		public Task<ApiResponse<GetRolesIncludeClaimsResponseDTO>> GetRolesInCludeClaimsAsync();
		public Task<ApiResponse<object>> AddRoleAsync(AddOrUpdateRoleRequestDTO model);
		public Task<ApiResponse<object>> UpdateRoleAsync(string roleId, AddOrUpdateRoleRequestDTO model);
		public Task<ApiResponse<object>> DeleteRoleAsync(string roleId);

		
	}
}
