using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.Auth;
using WareHouseManagement.Services.Auth.Interfaces;

namespace WareHouseManagement.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;
		public AuthController(IAuthService authService) 
		{ 
			_authService = authService;
		}

		[HttpPost("Login")]
		public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequestDTO)
		{
			var result = await _authService.Login(loginRequestDTO);

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
