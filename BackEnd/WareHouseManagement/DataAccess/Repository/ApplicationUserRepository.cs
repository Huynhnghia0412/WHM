using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class ApplicationUserRepository : Repository<ApplicationUser>, IApplicationUserRepository
	{
		public ApplicationUserRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(ApplicationUser ApplicationUser)
		{
			_db.Update(ApplicationUser);
		}
	}
}
