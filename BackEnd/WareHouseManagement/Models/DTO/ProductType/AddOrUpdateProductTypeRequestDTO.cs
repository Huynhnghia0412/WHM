using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.ProductType
{
	public class AddOrUpdateProductTypeRequestDTO
	{
		[Required(ErrorMessage = "Nhập mã loại hàng")]
		public string ProductTypeCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Nhập tên loại hàng")]
		public string Name { get; set; } = string.Empty;
		public string? Detail { get; set; } = string.Empty;
	}
}
