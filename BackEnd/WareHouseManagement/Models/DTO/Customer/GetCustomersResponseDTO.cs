namespace WareHouseManagement.Models.DTO.Customer
{
	public class GetCustomersResponseDTO
	{
        public GetCustomersResponseDTO()
        {
			Customers = new();
		}

        public List<Models.Customer> Customers { get; set; }
    }
}
