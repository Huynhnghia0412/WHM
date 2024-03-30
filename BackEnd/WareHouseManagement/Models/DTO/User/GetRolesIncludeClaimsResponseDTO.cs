using Microsoft.AspNetCore.Identity;

namespace WareHouseManagement.Models.DTO.User
{
	public class GetRolesIncludeClaimsResponseDTO
	{
        public GetRolesIncludeClaimsResponseDTO()
        {
			Roles = new();
		}
        public List<RoleWithClaims> Roles { get; set; }
    }
}
