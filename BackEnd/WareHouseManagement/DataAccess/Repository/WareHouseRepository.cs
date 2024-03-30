using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class WareHouseRepository : Repository<WareHouse>, IWareHouseRepository
	{
		public WareHouseRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(WareHouse wareHouse)
		{
			_db.Update(wareHouse);
		}
	}
}
