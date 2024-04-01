using Microsoft.AspNetCore.Identity;
using WareHouseManagement.Models;
using System.Security.Claims;
using WareHouseManagement.Models.DTO.User;
using System.Linq;

namespace WareHouseManagement.Utilities
{
	public static class UserClaim
	{
		public static void AddClaimsToUser(ApplicationUser user, UserManager<ApplicationUser> userManager, List<AddOrUpdateClaimRequestDTO> newClaims)
		{
			// Chuyển đổi danh sách claims thành một Dictionary
			var claimsDictionary = newClaims.ToDictionary(c => c.ClaimType, c => c.ClaimValue);

			// Duyệt qua danh sách các claim mặc định
			foreach (var defaultClaim in SD.ClaimList)
			{
				// Kiểm tra xem claim mặc định đã tồn tại trong danh sách claims không
				if (!claimsDictionary.ContainsKey(defaultClaim.Key))
				{
					// Nếu không tồn tại, thêm claim mặc định vào danh sách
					claimsDictionary.Add(defaultClaim.Key, "False");
				}
			}

			foreach (var claim in claimsDictionary)
			{
				userManager.AddClaimAsync(user, new Claim(claim.Key, claim.Value)).GetAwaiter().GetResult();
			}
		}

		public static void UpdateClaimsToUser(ApplicationUser user, UserManager<ApplicationUser> userManager, List<AddOrUpdateClaimRequestDTO> newClaims)
		{
			// Chuyển đổi danh sách claims thành một Dictionary
			var claimsDictionary = newClaims.ToDictionary(c => c.ClaimType, c => c.ClaimValue);

			// Lấy danh sách các claims hiện tại của người dùng
			var existingClaims = userManager.GetClaimsAsync(user).GetAwaiter().GetResult();

			if (existingClaims == null)
			{
				AddClaimsToUser(user, userManager, newClaims);
				return; // Sớm kết thúc phương thức nếu không có claims hiện tại
			}

			// Thêm hoặc cập nhật claims mới
			foreach (var claimPair in SD.ClaimList)
			{
				var claim = new Claim(claimPair.Key, claimPair.Value);
				if (claimsDictionary.ContainsKey(claimPair.Key))
				{
					var newClaim = claimsDictionary.FirstOrDefault(x => x.Key == claimPair.Key);
					var oldClaim = existingClaims.FirstOrDefault(x => x.Type == claimPair.Key);

					if (oldClaim == null)
					{
						// Không tìm thấy claim cũ, thêm claim mới
						userManager.AddClaimAsync(user, new Claim(newClaim.Key, newClaim.Value)).GetAwaiter().GetResult();
					}
					else
					{
						// Tìm thấy claim cũ, cập nhật giá trị của claim
						userManager.ReplaceClaimAsync(user, oldClaim, new Claim(newClaim.Key, newClaim.Value)).GetAwaiter().GetResult();
					}
				}
			}
		}

		public static List<Claim> GetClaimsOfUserAsync(ApplicationUser user, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
		{
			//lấy danh sách role của người dùng
			var roles = userManager.GetRolesAsync(user).GetAwaiter().GetResult();
			// lấy userClaims
			var userClaims = userManager.GetClaimsAsync(user).GetAwaiter().GetResult();
			var userClaimsWithFalseValue = userClaims.Where(x => x.Value.Equals("False"));

			//lấy role của user
			var role = roleManager.FindByNameAsync(roles.FirstOrDefault()).GetAwaiter().GetResult();
			//lấy roleClaims
			var roleClaims = roleManager.GetClaimsAsync(role).GetAwaiter().GetResult();
			var roleClaimsWithFalseValue = roleClaims.Where(x => x.Value.Equals("False"));

			List<Claim> claims = new List<Claim>
			{
				new Claim("fullName",user.FullName),
				new Claim("id",user.Id.ToString()),
				new Claim(ClaimTypes.Email,user.UserName),
				new Claim(ClaimTypes.Role,roles.FirstOrDefault())
			};

			foreach (var claim in SD.ClaimList)
			{
				if (userClaimsWithFalseValue.Any(u => u.Type.Equals(claim.Key) && u.Value.Equals(claim.Value)))
				{
					claims.Add(new Claim(claim.Key, claim.Value));
				}
				else
				{
					if (roleClaimsWithFalseValue.Any(u => u.Type.Equals(claim.Key) && u.Value.Equals(claim.Value)))
					{
						claims.Add(new Claim(claim.Key, claim.Value));
					}
					else
					{
						claims.Add(new Claim(claim.Key, "True"));
					}
				}
			}
			return claims;
		}

		public static List<Claim> ClaimListToClaimItemList(Dictionary<string, string> claimList)
		{
			return claimList.Select(pair => new Claim(pair.Key, pair.Value)).ToList();
		}
	}
}
