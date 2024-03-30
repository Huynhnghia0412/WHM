using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.ProductType;
using WareHouseManagement.Services.ProductType.Interfaces;

namespace WareHouseManagement.Controllers.ProductType
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductTypeController : ControllerBase
	{
		private readonly IProductTypeServices _productType;

		public ProductTypeController(IProductTypeServices productType)
		{
			_productType = productType;
		}

		[HttpGet("GetProductTypes")]
		public async Task<IActionResult> GetProductTypes()
		{
			var result = await _productType.GetProductTypes();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("AddProductType")]
		public async Task<IActionResult> AddProductType([FromBody] AddOrUpdateProductTypeRequestDTO model)
		{
			var result = await _productType.AddProductType(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateProductType/{id}")]
		public async Task<IActionResult> UpdateProductType(int id, [FromBody] AddOrUpdateProductTypeRequestDTO model)
		{
			var result = await _productType.UpdateProductType(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteProductType/{id}")]
		public async Task<IActionResult> DeleteProductType(int id)
		{
			var result = await _productType.DeleteProductType(id);

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
