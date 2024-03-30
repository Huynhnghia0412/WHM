using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface INoteRepository : IRepository<Note>
	{
		void Update(Note note);
	}
}
