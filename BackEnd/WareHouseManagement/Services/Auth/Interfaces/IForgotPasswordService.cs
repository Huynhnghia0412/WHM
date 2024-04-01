using WareHouseManagement.Models.DTO.ForgotPassword;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Auth.Interfaces
{
    public interface IForgotPasswordService
    {
        Task<ApiResponse<object>> ForgotPassword(ForgotPasswordRequestDTO model);
        Task<ApiResponse<object>> ChangePassword(ChangePasswordRequestDTO model);
    }
}
