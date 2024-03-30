using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace WareHouseManagement.Models.DTO.User
{
	public class AddOrUpdateRoleRequestDTO
	{
		public AddOrUpdateRoleRequestDTO()
		{
			Claims = new();
		}

		[Required(ErrorMessage = "Nhập tên vai trò")]
		public string Name { get; set; } = string.Empty;

		public List<AddOrUpdateClaimRequestDTO> Claims { get; set; }
	}
}
