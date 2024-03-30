using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface INoteItemRepository : IRepository<NoteItem>
	{
		void Update(NoteItem noteItem);
	}
}
