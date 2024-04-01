using WareHouseManagement.Models.DTO.Auth;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Auth.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<object>> Login(LoginRequestDTO loginRequestDTO);
    }
}
