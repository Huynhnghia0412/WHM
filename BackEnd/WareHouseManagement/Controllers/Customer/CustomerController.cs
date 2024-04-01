using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Attributes;
using WareHouseManagement.Models.DTO.Customer;
using WareHouseManagement.Services.Customer.Interafaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Controllers.Customer
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class CustomerController : ControllerBase
	{
		private readonly ICustomerServices _customer;

		public CustomerController(ICustomerServices customer)
		{
			_customer = customer;
		}

		[HttpGet("GetCustomers")]
		[AuthorizeClaim(SD.Claim_ReadCustomer)]
		public async Task<IActionResult> GetCustomers()
		{
			var result = await _customer.GetCustomers();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("AddCustomer")]
		[AuthorizeClaim(SD.Claim_ModifyCustomer)]
		public async Task<IActionResult> AddCustomer([FromBody] AddOrUpdateCustomerResponseDTO model)
		{
			var result = await _customer.AddCustomer(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPut("UpdateCustomer/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyCustomer)]
		public async Task<IActionResult> UpdateCustomer(int id, [FromBody] AddOrUpdateCustomerResponseDTO model)
		{
			var result = await _customer.UpdateCustomer(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpDelete("DeleteCustomer/{id}")]
		[AuthorizeClaim(SD.Claim_ModifyCustomer)]
		public async Task<IActionResult> DeleteCustomer(int id)
		{
			var result = await _customer.DeleteCustomer(id);

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
