using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class NoteRepository : Repository<Note>, INoteRepository
	{
		public NoteRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(Note note)
		{
			_db.Update(note);
		}
	}
}
