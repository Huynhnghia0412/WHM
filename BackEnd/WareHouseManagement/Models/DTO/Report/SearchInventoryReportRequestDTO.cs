using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.Report
{
	public class SearchInventoryReportRequestDTO
	{
		public string ProductNameOrCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Chọn loại hàng")]
		public int ProductTypeId { get; set; }
		[Required(ErrorMessage = "Chọn từ ngày")]
		public DateTime FromDate { get; set; }
		[Required(ErrorMessage = "Chọn đến ngày")]
		public DateTime ToDate { get; set; }
	}
}
