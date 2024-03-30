namespace WareHouseManagement.DataAccess.Repository.IRepository
{
	public interface IUnitOfWork
	{
		IApplicationUserRepository ApplicationUser { get; }
		ICustomerRepository Customer { get; }
		INoteItemRepository NoteItem { get; }
		IProductRepository Product { get; }
		INoteRepository Note { get; }
		IProductTypeRepository ProductType { get; }
		IWareHouseRepository WareHouse { get; }
	
		void Save();
		void SaveAsync();
	}
}
