using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.Product
{
	public class AddOrUpdateProductRequestDTO
	{
		[Required(ErrorMessage = "Chọn loại hàng")]
		public int ProductTypeId { get; set; }
		[Required(ErrorMessage = "Nhập mã hàng")]
		public string ProductCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập tên hàng")]
		public string Name { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập giá hàng")]
		public double Price { get; set; }
		[Required(ErrorMessage = "Nhập đơn vị tính")]
		public string Unit { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập trạng thái hàng")]
		public string Status { get; set; } = string.Empty;
		public string? Des { get; set; } = string.Empty;
	}
}
