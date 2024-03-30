using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WareHouseManagement.Models;

namespace WareHouseManagement.Models
{
	public class Note
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string NoteCode { get; set; } = string.Empty;
		[Required]
		public DateTime NoteDate { get; set; }
		public string? Des { get; set; } = string.Empty;

		[Required]
		public int WareHouseId { get; set; }
		[ForeignKey("WareHouseId")]
		public WareHouse? WareHouse { get; set; }

		[Required]
		public string UserId { get; set; }
		[ForeignKey("UserId")]
		public ApplicationUser? User { get; set; }

		[Required]
		public int CustomerId { get; set; }
		[ForeignKey("CustomerId")]
		public Customer? Customer { get; set; }

		public ICollection<NoteItem>? NoteItems { get; set; }

		[NotMapped]
		public string WareHouseName { get; set; }= string.Empty;
		[NotMapped]
		public string UserName { get; set; } = string.Empty;
		[NotMapped]
		public string CustomerName { get; set; } = string.Empty;
		[NotMapped]
		public double Total { get; set; } 
	}
}
