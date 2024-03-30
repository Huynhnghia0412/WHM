using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface IProductRepository : IRepository<Product>
	{
		void Update(Product product);
	}
}
