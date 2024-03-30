using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;

namespace WareHouseManagement.DataAccess.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		public ApplicationDbContext _db;
		public IApplicationUserRepository ApplicationUser { get; private set; }
		public ICustomerRepository Customer { get; private set; }
		public INoteItemRepository NoteItem { get; private set; }
		public IProductRepository Product { get; private set; }
		public INoteRepository Note { get; private set; }
		public IProductTypeRepository ProductType { get; private set; }
		public IWareHouseRepository WareHouse { get; private set; }


		public UnitOfWork(ApplicationDbContext db)
		{
			_db = db;
			ApplicationUser = new ApplicationUserRepository(_db);
			Customer = new CustomerRepository(_db);
			NoteItem = new NoteItemRepository(_db);
			Product = new ProductRepository(_db);
			ProductType = new ProductTypeRepository(_db);
			Note = new NoteRepository(_db);
			WareHouse = new WareHouseRepository(_db);
		}

		public void Save()
		{
			_db.SaveChanges();
		}

		public void SaveAsync()
		{
			_db.SaveChangesAsync();
		}
	}
}
