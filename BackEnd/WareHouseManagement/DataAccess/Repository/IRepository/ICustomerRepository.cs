using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface ICustomerRepository : IRepository<Customer>
	{
		void Update(Customer customer);
	}
}
