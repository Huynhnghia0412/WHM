using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WareHouseManagement.Models
{
	public class Product
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string ProductCode { get; set; } = string.Empty;
		[Required]
		public string Name { get; set; } = string.Empty;
		[Required]
		public double Price { get; set; }
		[Required]
		public string Unit { get; set; } = string.Empty;
		[Required]
		public string Status { get; set; } = string.Empty;
		public string? Des { get; set; } = string.Empty;
		public DateTime CreateTime { get; set; } = DateTime.Now;

		[Required]
		public int ProductTypeId { get; set; }
		[ForeignKey("ProductTypeId")]
		public ProductType? ProductType { get; set; }

		public ICollection<NoteItem>? NoteItems { get; set; }

		[NotMapped]
		public int QuantityInWareHouse { get; set; }
	}
}
