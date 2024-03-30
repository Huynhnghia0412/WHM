using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class ProductTypeRepository : Repository<ProductType>, IProductTypeRepository
	{
		public ProductTypeRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(ProductType productType)
		{
			_db.Update(productType);
		}
	}
}
