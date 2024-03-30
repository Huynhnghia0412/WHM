using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface IWareHouseRepository : IRepository<WareHouse>
	{
		void Update(WareHouse wareHouse);
	}
}
