using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Models.DTO.Report;
using WareHouseManagement.Services.Report.Interfaces;

namespace WareHouseManagement.Controllers.Report
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReportController : ControllerBase
	{
		private readonly IReportServices _report;
		public ReportController(IReportServices report)
		{
			_report = report;
		}


		[HttpPost("SearchInOutReport")]
		public async Task<IActionResult> SearchInOutReport([FromBody] SearchInventoryReportRequestDTO model)
		{
			var result = await _report.GetInOutReportAsync(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("SearchRevenueReport")]
		public async Task<IActionResult> SearchRevenueReport([FromBody] SearchRevenueReportRequestDTO model)
		{
			var result = await _report.GetRevenueReportAsync(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpPost("SearchCustomerRevenueReport")]
		public async Task<IActionResult> SearchCustomerRevenueReport([FromBody] SearchCustomerRevenueReportRequestDTO model)
		{
			var result = await _report.GetCustomerRevenueReportAsync(model);

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
