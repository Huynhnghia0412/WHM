using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.WH;
using WareHouseManagement.Services.WareHouse.Interfaces;

namespace WareHouseManagement.Controllers.WareHouse
{
	[Route("api/[controller]")]
	[ApiController]
	public class WareHouseController : ControllerBase
	{
		private readonly IWareHouseServices _wareHouse;

		public WareHouseController(IWareHouseServices wareHouse)
		{
			_wareHouse = wareHouse;
		}

		[HttpGet("GetWareHouses")]
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
