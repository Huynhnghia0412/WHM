
namespace WareHouseManagement.Utilities
{
	public class SD
	{
		//Role
		public const string Role_Admin = "Quản trị";
		public const string Role_Accountant = "Kế toán";
		public const string Role_StoreKeeper = "Thủ kho";
		public const string Role_BoardOfManager = "Ban giám đốc";

		//claim
		public const string Claim_ReadInOutNote = "readInOutNote";
		public const string Claim_ModifyInOutNote = "modifyInOutNote";
		public const string Claim_ReadWarehouse = "readWarehouse";
		public const string Claim_ModifyWarehouse = "modifyWarehouse";
		public const string Claim_ReadProduct = "readProduct";
		public const string Claim_ModifyProduct = "modifyProduct";
		public const string Claim_ReadProductType = "readProductType";
		public const string Claim_ModifyProductType = "modifyProductType";
		public const string Claim_ReadCheckInventory = "readCheckInventory";
		public const string Claim_ModifyCheckInventory = "modifyCheckInventory";
		public const string Claim_ReadCustomer = "readCustomer";
		public const string Claim_ModifyCustomer = "modifyCustomer";  

		//claims
		public static Dictionary<string, string> ClaimList = new Dictionary<string, string>()
		{
			 { Claim_ReadInOutNote, "False" },
			{ Claim_ModifyInOutNote, "False" },
			{ Claim_ReadWarehouse, "False" },
			{ Claim_ModifyWarehouse, "False" },
			{ Claim_ReadProduct, "False" },
			{ Claim_ModifyProduct, "False" },
			{ Claim_ReadProductType, "False" },
			{ Claim_ModifyProductType, "False" },
			{ Claim_ReadCheckInventory, "False" },
			{ Claim_ModifyCheckInventory, "False" },
			{ Claim_ReadCustomer, "False" },
			{ Claim_ModifyCustomer, "False" }
		};

	}
}
