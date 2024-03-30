using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface IApplicationUserRepository : IRepository<ApplicationUser>
	{
		void Update(ApplicationUser applicationUser);
	}
}
