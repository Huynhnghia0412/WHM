namespace WareHouseManagement.Models.DTO.Report
{
	public class GetInventoryReportResponseDTO
	{
        public GetInventoryReportResponseDTO()
        {
			Products = new();
		}

        public List<Models.Product> Products { get; set; }
		public int TotalQuantity { get; set; } = 0;
		public double TotalValue { get; set; } = 0;
	}
}
