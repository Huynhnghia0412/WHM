using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WareHouseManagement.Models;

namespace WareHouseManagement.DataAccess.Data
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}

		public DbSet<ApplicationUser> ApplicationUsers {  get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Note> Notes { get; set; }
		public DbSet<NoteItem> NoteItem { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<ProductType> ProductTypes { get; set; }
		public DbSet<WareHouse> WareHouses { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			foreach (var e in modelBuilder.Model.GetEntityTypes())
			{
				var tableName = e.GetTableName();
				if (tableName.StartsWith("AspNet"))
				{
					e.SetTableName(tableName.Substring(6));
				}

				var note = modelBuilder.Entity<Note>();
				note.HasOne(m => m.WareHouse)
				.WithMany(s => s.Notes);
				note.HasOne(m => m.User)
				.WithMany(t => t.Notes);
				note.HasOne(m => m.Customer)
				.WithMany(t => t.Notes);

				var wareHouse = modelBuilder.Entity<WareHouse>();
				wareHouse.HasMany(s => s.Notes)
			   .WithOne(m => m.WareHouse)
			   .HasForeignKey(m => m.WareHouseId)
			   .OnDelete(DeleteBehavior.NoAction); // sửa lỗi Introducing FOREIGN KEY constraint
			}

		}

	}
}
