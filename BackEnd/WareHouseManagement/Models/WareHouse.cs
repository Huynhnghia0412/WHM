using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WareHouseManagement.Models;

namespace WareHouseManagement.Models
{
	public class WareHouse
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; } = string.Empty;
		public DateTime CreateTime { get; set; } = DateTime.Now;

		[Required]
		public string? UserId { get; set; }
		[ForeignKey("UserId")]
		public ApplicationUser? User { get; set; }

		public ICollection<Note>? Notes { get; set; }


		[NotMapped]
		public string Email { get; set; } = string.Empty;
	}
}
