namespace WareHouseManagement.Models.DTO.User
{
	public class AddOrUpdateClaimRequestDTO
	{
		public string ClaimType { get; set; } = string.Empty;
		public string ClaimValue { get; set; } = string.Empty;
	}
}
