using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class ProductRepository : Repository<Product>, IProductRepository
	{
		public ProductRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(Product product)
		{
			_db.Update(product);
		}
	}
}
