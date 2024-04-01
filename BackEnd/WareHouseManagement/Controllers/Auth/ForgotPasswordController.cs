using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.ForgotPassword;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Auth.Interfaces;

namespace WareHouseManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ForgotPasswordController : ControllerBase
	{
		private readonly IForgotPasswordService _forgotPasswordService;
		public ApiResponse<object> _res;
		public ForgotPasswordController(IForgotPasswordService forgotPasswordService)
		{
			_forgotPasswordService = forgotPasswordService;
			_res = new();
		}

		[HttpPost("SendEmail")]
		public async Task<IActionResult> SendEmail([FromBody] ForgotPasswordRequestDTO model)
		{
			var result = await _forgotPasswordService.ForgotPassword(model);
			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("ChangePassword")]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestDTO model)
		{
			var result = await _forgotPasswordService.ChangePassword(model);
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
