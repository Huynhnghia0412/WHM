using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WareHouseManagement.Models
{
	public class ProductType
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string ProductTypeCode { get; set; } = string.Empty;
		[Required]
		public string Name { get; set; } = string.Empty;
		public string? Detail { get; set; } = string.Empty;
		public DateTime CreateTime { get; set; } = DateTime.Now;

		public ICollection<Product>? Products { get; set; }
	}
}
