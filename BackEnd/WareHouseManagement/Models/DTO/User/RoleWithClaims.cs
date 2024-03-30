using Microsoft.AspNetCore.Identity;

namespace WareHouseManagement.Models.DTO.User
{
	public class RoleWithClaims
	{
        public RoleWithClaims()
        {
			Role = new();
			RoleClaims = new();
		}
        public IdentityRole Role { get; set; }
		public List<IdentityRoleClaim<string>> RoleClaims { get; set; }
	}
}
