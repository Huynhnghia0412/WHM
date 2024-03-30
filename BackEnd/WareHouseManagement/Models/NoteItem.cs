using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WareHouseManagement.Models
{
	public class NoteItem
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public double Price { get; set; }
		[Required]
		public int Quantity { get; set; }

		[Required]
		public int NoteId { get; set; }
		[ForeignKey("NoteId")]
		public Note? Note { get; set; }

		[Required]
		public int ProductId { get; set; }
		[ForeignKey("ProductId")]
		public Product? Product { get; set; }
	}
}
