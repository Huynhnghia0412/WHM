using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.ForgotPassword
{
	public class ChangePasswordRequestDTO
	{
		[Required]
		public string UserId { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập mật khẩu")]
		public string Password { get; set; } = string.Empty;
		[Required]
		public string ResetToken { get; set; } = string.Empty;
	}
}
