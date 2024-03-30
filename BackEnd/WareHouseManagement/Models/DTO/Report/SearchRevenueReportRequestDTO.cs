using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.Report
{
	public class SearchRevenueReportRequestDTO
	{
		[Required(ErrorMessage = "Chọn từ ngày")]
		public DateTime FromDate { get; set; }
		[Required(ErrorMessage = "Chọn đến ngày")]
		public DateTime ToDate { get; set; }
	}
}
