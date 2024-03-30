using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface IProductTypeRepository : IRepository<ProductType>
	{
		void Update(ProductType productType);
	}
}
