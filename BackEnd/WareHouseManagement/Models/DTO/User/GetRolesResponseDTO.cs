using Microsoft.AspNetCore.Identity;

namespace WareHouseManagement.Models.DTO.User
{
	public class GetRolesResponseDTO
	{
        public GetRolesResponseDTO()
        {
			Roles = new();
		}
        public List<IdentityRole> Roles { get; set; }
    }
}
