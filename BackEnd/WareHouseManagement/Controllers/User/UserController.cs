using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.User;
using WareHouseManagement.Services.User.Interfaces;

namespace WareHouseManagement.Controllers.User
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserServices _user;

		public UserController(IUserServices user)
		{
			_user = user;
		}

		[HttpGet("GetEmployees")]
		public async Task<IActionResult> GetEmployees()
		{
			var result = await _user.GetEmployeesAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpGet("GetRoles")]
		public async Task<IActionResult> GetRoles()
		{
			var result = await _user.GetRolesAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpGet("GetRolesInCludeClaims")]
		public async Task<IActionResult> GetRolesInCludeClaims()
		{
			var result = await _user.GetRolesInCludeClaimsAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("AddRole")]
		public async Task<IActionResult> AddRole([FromBody] AddOrUpdateRoleRequestDTO model)
		{
			var result = await _user.AddRoleAsync(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateRole/{id}")]
		public async Task<IActionResult> UpdateRole(string id, [FromBody] AddOrUpdateRoleRequestDTO model)
		{
			var result = await _user.UpdateRoleAsync(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteRole/{id}")]
		public async Task<IActionResult> DeleteRole(string id)
		{
			var result = await _user.DeleteRoleAsync(id);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		// user

		[HttpPost("AddUser")]
		public async Task<IActionResult> AddUser([FromBody] AddUserRequestDTO model)
		{
			var result = await _user.AddUserAsync(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateUser/{id}")]
		public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserRequestDTO model)
		{
			var result = await _user.UpdateUserAsync(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteUser/{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var result = await _user.DeleteUserAsync(id);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}
	}
}
