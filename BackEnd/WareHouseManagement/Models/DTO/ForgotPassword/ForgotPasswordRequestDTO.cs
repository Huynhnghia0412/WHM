using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.ForgotPassword
{
	public class ForgotPasswordRequestDTO
	{
		[Required(ErrorMessage = "Nhập email")]
		[EmailAddress(ErrorMessage = "Sai cấu trúc email")]
		public string Email { get; set; } = string.Empty;
	}
}
