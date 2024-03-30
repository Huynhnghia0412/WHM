using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WareHouseManagement.Models;

namespace WareHouseManagement.Models
{
	public class Customer
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string CustomerCode { get; set; } = string.Empty;
		[Required]
		public string Name { get; set; } = string.Empty;
		[Required]
		public string Email { get; set; } = string.Empty;
		[Required]
		public string Phone { get; set; } = string.Empty;
		public string? Address { get; set; } = string.Empty;
		public string? Tax { get; set; } = string.Empty;
		public DateTime CreateTime { get; set; } = DateTime.Now;

		public ICollection<Note>? Notes { get; set; }
	}
}
