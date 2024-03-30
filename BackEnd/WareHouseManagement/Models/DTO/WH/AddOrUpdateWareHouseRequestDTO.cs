using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.WH
{
	public class AddOrUpdateWareHouseRequestDTO
	{
		[Required(ErrorMessage ="Nhập tên kho")]
		public string Name { get; set; } = string.Empty;
		[Required(ErrorMessage = "Chọn người quản kho")]
		public string UserId { get; set; } = string.Empty;
	}
}
