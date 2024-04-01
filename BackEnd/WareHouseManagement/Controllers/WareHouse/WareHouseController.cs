using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Attributes;
using WareHouseManagement.Models.DTO.WH;
using WareHouseManagement.Services.WareHouse.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Controllers.WareHouse
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class WareHouseController : ControllerBase
	{
		private readonly IWareHouseServices _wareHouse;

		public WareHouseController(IWareHouseServices wareHouse)
		{
			_wareHouse = wareHouse;
		}

		[HttpGet("GetWareHouses")]
		[AuthorizeClaim(SD.Claim_ReadWarehouse)]
		public async Task<IActionResult> GetWareHouses()
		{
			var result = await _wareHouse.GetWareHouses();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("AddWareHouse")]
		[AuthorizeClaim(SD.Claim_ModifyWarehouse)]
		public async Task<IActionResult> AddWareHouse([FromBody] AddOrUpdateWareHouseRequestDTO model)
		{
			var result = await _wareHouse.AddWareHouse(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateWareHouse/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyWarehouse)]
		public async Task<IActionResult> UpdateProductType(int id, [FromBody] AddOrUpdateWareHouseRequestDTO model)
		{
			var result = await _wareHouse.UpdateWareHouse(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteWareHouse/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyWarehouse)]
		public async Task<IActionResult> DeleteProductType(int id)
		{
			var result = await _wareHouse.DeleteWareHouse(id);

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
