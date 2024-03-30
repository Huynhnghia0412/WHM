namespace WareHouseManagement.Models.DTO.Note
{
	public class GetInOutNotesResponseDTO
	{
        public GetInOutNotesResponseDTO()
        {
			Notes = new();
			Products = new();
		}
        public List<Models.Note> Notes { get; set; }
		public List<Models.Product> Products { get; set; }
	}
}
