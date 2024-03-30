namespace WareHouseManagement.Models.DTO.Report
{
	public class GetRevenueReportResponseDTO
	{
        public GetRevenueReportResponseDTO()
        {
			Customer = new();
		}
		public Models.Customer Customer { get; set; }
		public double Revenue { get; set; } = 0;
    }
}
