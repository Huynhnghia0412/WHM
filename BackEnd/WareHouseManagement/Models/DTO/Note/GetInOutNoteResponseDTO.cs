namespace WareHouseManagement.Models.DTO.Note
{
	public class GetInOutNoteResponseDTO
	{
        public GetInOutNoteResponseDTO()
        {
			Products = new();
		}
        public Models.Note Note { get; set; }
		public List<Models.Product> Products { get; set; }
	}
}
