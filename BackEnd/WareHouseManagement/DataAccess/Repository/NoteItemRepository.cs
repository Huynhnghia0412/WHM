using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository
{
	public class NoteItemRepository : Repository<NoteItem>, INoteItemRepository
	{
		public NoteItemRepository(ApplicationDbContext db) : base(db)
		{
		}

		public void Update(NoteItem noteItem)
		{
			_db.Update(noteItem);
		}
	}
}
