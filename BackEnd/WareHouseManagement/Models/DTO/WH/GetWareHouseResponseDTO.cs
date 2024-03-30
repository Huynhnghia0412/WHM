namespace WareHouseManagement.Models.DTO.WH
{
	public class GetWareHouseResponseDTO
	{
        public GetWareHouseResponseDTO()
        {
			WareHouses = new();
		}
        public List<WareHouse> WareHouses { get; set; }
    }
}
