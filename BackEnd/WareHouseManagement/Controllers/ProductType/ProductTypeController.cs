using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Attributes;
using WareHouseManagement.Models.DTO.ProductType;
using WareHouseManagement.Services.ProductType.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Controllers.ProductType
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ProductTypeController : ControllerBase
	{
		private readonly IProductTypeServices _productType;

		public ProductTypeController(IProductTypeServices productType)
		{
			_productType = productType;
		}

		[HttpGet("GetProductTypes")]
		[AuthorizeClaim(SD.Claim_ReadProductType)]
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
		[AuthorizeClaim(SD.Claim_ModifyProductType)]
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
		[AuthorizeClaim(SD.Claim_ModifyProductType)]
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
		[AuthorizeClaim(SD.Claim_ModifyProductType)]
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
