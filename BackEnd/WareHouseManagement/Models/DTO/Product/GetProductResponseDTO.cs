namespace WareHouseManagement.Models.DTO.Product
{
	public class GetProductResponseDTO
	{
		public GetProductResponseDTO()
		{
			Products = new();
			ProductTypes = new();
		}
		public List<Models.Product> Products { get; set; }
		public List<Models.ProductType> ProductTypes { get; set; }
	}
}
