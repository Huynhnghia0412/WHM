using WareHouseManagement.Models.DTO.Report;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Report.Interfaces
{
	public interface IReportServices
	{
		Task<ApiResponse<GetInventoryReportResponseDTO>> GetInOutReportAsync(SearchInventoryReportRequestDTO model);
		Task<ApiResponse<GetRevenueReportResponseDTO>> GetRevenueReportAsync(SearchRevenueReportRequestDTO model);
		Task<ApiResponse<GetRevenueReportResponseDTO>> GetCustomerRevenueReportAsync(SearchCustomerRevenueReportRequestDTO model);
	}
}
