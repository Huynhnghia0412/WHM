using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.User
{
	public class UpdateUserRequestDTO
	{
		[Required(ErrorMessage ="Nhập mã nhân viên")]
		public string UserCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập tên nhân viên")]
		public string FullName { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập email")]
		[EmailAddress(ErrorMessage ="Sai cấu trúc email")]
		public string Email { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập số điện thoại")]
		public string PhoneNumber { get; set; } = string.Empty;
		public string Tax { get; set; } = string.Empty;
		public string Address { get; set; } = string.Empty;
		[Required(ErrorMessage = "Chọn vai trò")]
		public string RoleId { get; set; } = string.Empty;

		public List<AddOrUpdateClaimRequestDTO> Claims { get; set; } = new();
	}
}
