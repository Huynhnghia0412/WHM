namespace WareHouseManagement.Models.DTO.Note
{
    public class GetCheckInventoryRequestDTO
    {
        public GetCheckInventoryRequestDTO()
        {
            Products = new();
        }
        public List<Models.Product> Products { get; set; }
    }
}
