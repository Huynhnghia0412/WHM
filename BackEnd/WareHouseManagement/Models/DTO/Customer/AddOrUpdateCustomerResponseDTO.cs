using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.Customer
{
	public class AddOrUpdateCustomerResponseDTO
	{
		[Required(ErrorMessage ="Nhập mã KH/NCC")]
		public string CustomerCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập tên KH/NCC")]
		public string Name { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập email")]
		public string Email { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập sdt")]
		public string Phone { get; set; } = string.Empty;
		public string? Address { get; set; } = string.Empty;
		public string? Tax { get; set; } = string.Empty;
	}
}
