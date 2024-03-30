namespace WareHouseManagement.Models.DTO.ProductType
{
	public class GetProductTypesResponseDTO
	{
        public GetProductTypesResponseDTO()
        {
			ProductTypes = new();
		}

        public List<Models.ProductType> ProductTypes { get; set; }
    }
}
