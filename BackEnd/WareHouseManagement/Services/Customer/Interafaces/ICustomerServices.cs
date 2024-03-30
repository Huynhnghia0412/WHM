using WareHouseManagement.Models.DTO.Customer;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Customer.Interafaces
{
	public interface ICustomerServices
	{
		public Task<ApiResponse<GetCustomersResponseDTO>> GetCustomers();
		public Task<ApiResponse<object>> AddCustomer(AddOrUpdateCustomerResponseDTO model);
		public Task<ApiResponse<object>> UpdateCustomer(int pId, AddOrUpdateCustomerResponseDTO model);
		public Task<ApiResponse<object>> DeleteCustomer(int pId);
	}
}
