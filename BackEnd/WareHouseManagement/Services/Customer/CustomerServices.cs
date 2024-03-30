using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models.DTO.Customer;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Customer.Interafaces;

namespace WareHouseManagement.Services.Customer
{
	public class CustomerServices : ICustomerServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public CustomerServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}

		public async Task<ApiResponse<GetCustomersResponseDTO>> GetCustomers()
		{
			ApiResponse<GetCustomersResponseDTO> res = new();
			res.Result.Customers = await _unitOfWork.Customer.GetAll().ToListAsync();
			return res;
		}

		public async Task<ApiResponse<object>> AddCustomer(AddOrUpdateCustomerResponseDTO model)
		{
			var customerInDbWithCode = await _unitOfWork.Customer.Get(x => x.CustomerCode.Equals(model.CustomerCode), true).FirstOrDefaultAsync();

			if (customerInDbWithCode != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.CustomerCode), new List<string> { $"Trùng mã KH/NCC." } }
					};
				return _res;
			}

			Models.Customer newCustomer = new()
			{
				CustomerCode = model.CustomerCode,
				Name = model.Name,
				Email = model.Email,
				Phone = model.Phone,
				Address = model.Address,
				Tax = model.Tax,
			};

			_unitOfWork.Customer.Add(newCustomer);
			_unitOfWork.Save();

			_res.Messages = "Đã thêm KH/NCC thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateCustomer(int id, AddOrUpdateCustomerResponseDTO model)
		{
			var customerInDbWithId = await _unitOfWork.Customer.Get(x => x.Id == id, true).FirstOrDefaultAsync();

			if (customerInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.CustomerCode), new List<string> { $"Không tìm thấy KH/NCC." } }
					};
				return _res;
			}

			var customerInDbWithCode = await _unitOfWork.Customer.Get(x => x.CustomerCode.Equals(model.CustomerCode), true).FirstOrDefaultAsync();

			if (customerInDbWithCode != null && customerInDbWithCode.Id != customerInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.CustomerCode), new List<string> { $"Trùng mã KH/NCC." } }
					};
				return _res;
			}

			customerInDbWithId.CustomerCode = model.CustomerCode;
			customerInDbWithId.Name = model.Name;
			customerInDbWithId.Email = model.Email;
			customerInDbWithId.Phone = model.Phone;
			customerInDbWithId.Address = model.Address;
			customerInDbWithId.Tax = model.Tax;

			_unitOfWork.Customer.Update(customerInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã cập nhật KH/NCC thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteCustomer(int id)
		{
			var customerInDbWithId = await _unitOfWork.Customer.Get(x => x.Id == id, true).Include(x => x.Notes).FirstOrDefaultAsync();

			if (customerInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không tìm thấy KH/NCC." } }
					};
				return _res;
			}

			if (customerInDbWithId.Notes != null && customerInDbWithId.Notes.Count() > 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không thể xóa KH/NCC vì đã được thêm vào trong phiếu." } }
					};
				return _res;
			}

			_unitOfWork.Customer.Remove(customerInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã xóa KH/NCC thành công.";
			return _res;
		}
	}
}
