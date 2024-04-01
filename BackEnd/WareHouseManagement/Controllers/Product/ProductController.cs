using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Attributes;
using WareHouseManagement.Models.DTO.Product;
using WareHouseManagement.Services.Product.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Controllers.Product
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ProductController : ControllerBase
	{
		private readonly IProductServices _product;

		public ProductController(IProductServices product)
		{
			_product = product;
		}

		[HttpGet("GetProducts")]
		[AuthorizeClaim(SD.Claim_ReadProduct)]
		public async Task<IActionResult> GetProducts()
		{
			var result = await _product.GetProducts();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpGet("GetProductInWareHouses/{id}")]
		public async Task<IActionResult> GetProductInWareHouses(int id)
		{
			var result = await _product.GetProductInWareHouses(id);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("AddProduct")]
		[AuthorizeClaim(SD.Claim_ModifyProduct)]
		public async Task<IActionResult> AddProduct([FromBody] AddOrUpdateProductRequestDTO model)
		{
			var result = await _product.AddProduct(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateProduct/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyProduct)]
		public async Task<IActionResult> UpdateProduct(int id, [FromBody] AddOrUpdateProductRequestDTO model)
		{
			var result = await _product.UpdateProduct(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteProduct/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyProduct)]
		public async Task<IActionResult> DeleteProduct(int id)
		{
			var result = await _product.DeleteProduct(id);

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
