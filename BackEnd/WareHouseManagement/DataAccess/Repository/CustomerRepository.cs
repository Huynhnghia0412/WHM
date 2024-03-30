using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class CustomerRepository : Repository<Customer>, ICustomerRepository
	{
		public CustomerRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(Customer customer)
		{
			_db.Update(customer);
		}
	}
}
