using WareHouseManagement.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WareHouseManagement.Models
{
	public class ApplicationUser : IdentityUser
	{
		[Required]
		public string UserCode { get; set; } = string.Empty;
		[Required]
		public string FullName { get; set; } = string.Empty;
		[Required]
		public string Email { get; set; } = string.Empty;
		[Required]
		public string PhoneNumber { get; set; } = string.Empty;
		public bool? IsAdmin { get; set; } = false;
		public bool? IsEmployee { get; set; } = false;
		public string Tax { get; set; } = string.Empty;
		public string Address { get; set; } = string.Empty;

		[NotMapped]
		public IdentityRole Role { get; set; } = new();
		[NotMapped]
		public List<IdentityUserClaim<string>> UserClaims { get; set; } = new();

		public ICollection<WareHouse>? WareHouses { get; set; }
		public ICollection<Note>? Notes { get; set; }
	}
}
