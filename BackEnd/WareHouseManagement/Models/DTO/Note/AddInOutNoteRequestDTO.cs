using System.ComponentModel.DataAnnotations;

namespace WareHouseManagement.Models.DTO.Note
{
	public class AddInOutNoteRequestDTO
	{
        public AddInOutNoteRequestDTO()
        {
			ProductList = new();
		}

		[Required(ErrorMessage = "Chọn nhà cung cấp")]
		public int CustomerId { get; set; }
		[Required]
		public string UserId { get; set; } = string.Empty;
		[Required(ErrorMessage = "Chọn kho")]
		public int WareHouseId { get; set; }

		[Required(ErrorMessage = "Nhập mã phiếu")]
		public string NoteCode { get; set; } = string.Empty;
		[Required(ErrorMessage = "Chọn ngày phiếu")]
		public DateTime NoteDate { get; set; }
		public string? Des { get; set; } = string.Empty;

		[Required(ErrorMessage = "Chọn hàng nhập")]
		public List<ProductList> ProductList {  get; set; }
	}
}
