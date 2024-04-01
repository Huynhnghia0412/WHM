using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;
using WareHouseManagement.Models.DTO.User;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.User.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Services.User
{
	public class UserServices : IUserServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly ApplicationDbContext _db;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private ApiResponse<object> _res;
		public UserServices(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext db)
		{
			_unitOfWork = unitOfWork;
			_userManager = userManager;
			_roleManager = roleManager;
			_db = db;
			_res = new();
		}

		public async Task<ApiResponse<GetUsersResponseDTO>> GetEmployeesAsync()
		{
			ApiResponse<GetUsersResponseDTO> res = new();

			var users = await _unitOfWork.ApplicationUser.GetAll().ToListAsync();

			foreach (var user in users)
			{
				// Lấy vai trò của người dùng
				var roles = await _userManager.GetRolesAsync(user);
				var role = await _roleManager.FindByNameAsync(roles.FirstOrDefault() ?? "");
				user.Role = role; // Lấy vai trò đầu tiên hoặc chuỗi rỗng nếu không có vai trò nào

				// Lấy các claim của người dùng
				var claims = await _userManager.GetClaimsAsync(user);
				user.UserClaims = claims.Select(c => new IdentityUserClaim<string> { ClaimType = c.Type, ClaimValue = c.Value }).ToList();
			}

			res.Result.Users = users;
			return res;
		}

		public async Task<ApiResponse<GetRolesResponseDTO>> GetRolesAsync()
		{
			ApiResponse<GetRolesResponseDTO> res = new();

			// Lấy danh sách các Role
			var roles = await _roleManager.Roles.ToListAsync();

			res.Result.Roles = roles;
			return res;
		}

		public async Task<ApiResponse<GetRolesIncludeClaimsResponseDTO>> GetRolesInCludeClaimsAsync()
		{
			ApiResponse<GetRolesIncludeClaimsResponseDTO> res = new();

			// Lấy danh sách các Role
			var roles = await _roleManager.Roles.ToListAsync();

			// Tạo một danh sách để lưu thông tin Role và RoleClaims
			List<RoleWithClaims> rolesWithClaims = new List<RoleWithClaims>();

			foreach (var role in roles)
			{
				// Lấy danh sách các RoleClaim của Role hiện tại
				var roleClaims = await _db.RoleClaims
			   .Where(rc => rc.RoleId == role.Id)
			   .ToListAsync();

				// Tạo một đối tượng RoleWithClaims để lưu Role và danh sách RoleClaim
				var roleWithClaims = new RoleWithClaims
				{
					Role = role,
					RoleClaims = roleClaims.ToList()
				};

				rolesWithClaims.Add(roleWithClaims);
			}

			res.Result.Roles = rolesWithClaims;
			return res;
		}

		public async Task<ApiResponse<object>> AddRoleAsync(AddOrUpdateRoleRequestDTO model)
		{
			// Kiểm tra xem role đã tồn tại chưa
			if (await _roleManager.RoleExistsAsync(model.Name))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Vai trò đã tồn tại." } }
					};
				return _res;
			}

			// Tạo mới role
			var newRole = new IdentityRole { Name = model.Name };
			var result = await _roleManager.CreateAsync(newRole);

			// Kiểm tra xem việc tạo role có thành công không
			if (!result.Succeeded)
			{
				// Không thành công
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{ nameof(model.Name), result.Errors.Select(e => e.Description).ToList() }
				};
				return _res;
			}


			// Thêm claims cho role mới
			foreach (var claimDto in model.Claims)
			{
				var claim = new Claim(claimDto.ClaimType, claimDto.ClaimValue);

				result = await _roleManager.AddClaimAsync(newRole, claim);

				// Kiểm tra xem việc thêm claim có thành công không
				if (!result.Succeeded)
				{
					// Nếu thêm không thành công, xóa role đã tạo trước đó và trả về lỗi
					await _roleManager.DeleteAsync(newRole);
					_res.IsSuccess = false;
					_res.Errors = new Dictionary<string, List<string>>
					{
						{ nameof(model.Name), result.Errors.Select(e => e.Description).ToList() }
					};
					return _res;
				}
			}

			_res.Messages = "Tạo mới vai trò thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateRoleAsync(string roleId, AddOrUpdateRoleRequestDTO model)
		{
			if (string.IsNullOrEmpty(roleId))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Sai Id." } }
					};
				return _res;
			}

			var roleInDb = await _roleManager.FindByIdAsync(roleId);

			if (roleInDb == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Không tìm thấy vai trò." } }
					};
				return _res;
			}

			// Kiểm tra trùng tên
			var roleInDbWithName = await _roleManager.FindByNameAsync(model.Name);

			if (roleInDbWithName != null && roleInDbWithName.Id != roleInDb.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên vai trò." } }
					};
				return _res;
			}

			// Tạo mới role
			roleInDb.Name = model.Name;
			var result = await _roleManager.UpdateAsync(roleInDb);

			// Kiểm tra xem việc tạo role có thành công không
			if (!result.Succeeded)
			{
				// Không thành công
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{ nameof(model.Name), result.Errors.Select(e => e.Description).ToList() }
				};
				return _res;
			}

			// Xóa tất cả các claim của vai trò
			var existingClaims = await _roleManager.GetClaimsAsync(roleInDb);
			foreach (var claim in existingClaims)
			{
				await _roleManager.RemoveClaimAsync(roleInDb, claim);
			}

			// Thêm claims cho role mới
			foreach (var claimDto in model.Claims)
			{
				var claim = new Claim(claimDto.ClaimType, claimDto.ClaimValue);

				result = await _roleManager.AddClaimAsync(roleInDb, claim);

				// Kiểm tra xem việc thêm claim có thành công không
				if (!result.Succeeded)
				{
					// Nếu thêm không thành công, xóa role đã tạo trước đó và trả về lỗi
					await _roleManager.DeleteAsync(roleInDb);
					_res.IsSuccess = false;
					_res.Errors = new Dictionary<string, List<string>>
					{
						{ nameof(model.Name), result.Errors.Select(e => e.Description).ToList() }
					};
					return _res;
				}
			}

			_res.Messages = "Cập nhật vai trò thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteRoleAsync(string roleId)
		{
			if (string.IsNullOrEmpty(roleId))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(roleId), new List<string> { $"Sai Id." } }
					};
				return _res;
			}

			var roleInDb = await _roleManager.FindByIdAsync(roleId);

			if (roleInDb == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(roleId), new List<string> { $"Không tìm thấy vai trò." } }
					};
				return _res;
			}

			// Kiểm tra xem có người dùng nào sử dụng vai trò này không
			var usersInRole = await _userManager.GetUsersInRoleAsync(roleInDb.Name);
			if (usersInRole.Any())
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(roleId), new List<string> { $"Vai trò đang được sử dụng bởi người dùng." } }
				};
				return _res;
			}

			// xóa claims
			var existingClaims = await _roleManager.GetClaimsAsync(roleInDb);
			foreach (var claim in existingClaims)
			{
				await _roleManager.RemoveClaimAsync(roleInDb, claim);
			}

			// xóa role
			await _roleManager.DeleteAsync(roleInDb);

			_res.Messages = "Xóa vai trò thành công";
			return _res;
		}


		// User 
		public async Task<ApiResponse<object>> AddUserAsync(AddUserRequestDTO model)
		{
			// Kiểm tra trùng username
			var userInDbWithUserName = await _unitOfWork.ApplicationUser.Get(x => x.UserName.Equals(model.UserName), true).FirstOrDefaultAsync();

			if (userInDbWithUserName != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.UserName), new List<string> { $"Trùng tài khoản." } }
				};
				return _res;
			}


			// Kiểm tra trùng mã
			var userInDbWithCode = await _unitOfWork.ApplicationUser.Get(x => x.UserCode.Equals(model.UserCode), true).FirstOrDefaultAsync();

			if (userInDbWithCode != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.UserCode), new List<string> { $"Trùng mã nhân viên." } }
				};
				return _res;
			}

			//kiểm tra trùng email
			var userInDbWithEmail = await _unitOfWork.ApplicationUser.Get(x => x.Email.Equals(model.Email), true).FirstOrDefaultAsync();

			if (userInDbWithEmail != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.Email), new List<string> { $"Trùng email." } }
				};
				return _res;
			}

			Models.ApplicationUser newUser = new()
			{
				UserName = model.UserName,
				UserCode = model.UserCode,
				Email = model.Email,
				FullName = model.FullName,
				PhoneNumber = model.PhoneNumber,
				Tax = model.Tax,
				Address = model.Address,
			};

			var result = await _userManager.CreateAsync(newUser, model.PassWord);

			if (!result.Succeeded)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{ nameof(model.UserCode), result.Errors.Select(e => e.Description).ToList() }
				};
				return _res;
			}

			var role = await _roleManager.FindByIdAsync(model.RoleId);
			if (role != null)
			{
				await _userManager.AddToRoleAsync(newUser, role.Name);
			}

			// Thêm claims cho người dùng
			UserClaim.AddClaimsToUser(newUser, _userManager, model.Claims);

			_res.Messages = "Thêm người dùng thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateUserAsync(string userId, UpdateUserRequestDTO model)
		{
			// Kiểm tra xem userId có hợp lệ không
			if (string.IsNullOrEmpty(userId))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Sai Id." } }
				};
				return _res;
			}

			// Tìm kiếm người dùng cần cập nhật
			var userToUpdate = await _userManager.FindByIdAsync(userId);

			if (userToUpdate == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Không tìm thấy người dùng." } }
				};
				return _res;
			}

			// Kiểm tra trùng email
			var userInDbWithEmail = await _unitOfWork.ApplicationUser.Get(x => x.Email.Equals(model.Email) && x.Id != userId, true).FirstOrDefaultAsync();

			if (userInDbWithEmail != null && userInDbWithEmail.Id != userToUpdate.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.Email), new List<string> { $"Trùng email." } }
				};
				return _res;
			}

			// Kiểm tra trùng mã
			var userInDbWithCode = await _unitOfWork.ApplicationUser.Get(x => x.UserCode.Equals(model.UserCode) && x.Id != userId, true).FirstOrDefaultAsync();

			if (userInDbWithCode != null && userInDbWithCode.Id != userToUpdate.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.UserCode), new List<string> { $"Trùng mã nhân viên." } }
				};
				return _res;
			}

			// Cập nhật thông tin người dùng
			userToUpdate.UserCode = model.UserCode;
			userToUpdate.Email = model.Email;
			userToUpdate.FullName = model.FullName;
			userToUpdate.PhoneNumber = model.PhoneNumber;
			userToUpdate.Tax = model.Tax;
			userToUpdate.Address = model.Address;

			// Lưu các thay đổi
			var result = await _userManager.UpdateAsync(userToUpdate);

			if (!result.Succeeded)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(model.UserCode), result.Errors.Select(e => e.Description).ToList() }
				};
				return _res;
			}

			// Thêm role
			var roleOfUser = await _userManager.GetRolesAsync(userToUpdate);

			var role = await _roleManager.FindByIdAsync(model.RoleId);

			if (roleOfUser != null && roleOfUser.Count > 0)
			{
				if (role != null)
				{
					if (!roleOfUser.FirstOrDefault().Equals(role.Name))
					{
						await _userManager.RemoveFromRoleAsync(userToUpdate, roleOfUser.FirstOrDefault());
						await _userManager.AddToRoleAsync(userToUpdate, role.Name);
					}
				}

			}

			// Cập nhật claims cho người dùng
			UserClaim.UpdateClaimsToUser(userToUpdate, _userManager, model.Claims);

			_res.Messages = "Cập nhật người dùng thành công";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteUserAsync(string userId)
		{
			// Kiểm tra xem userId có hợp lệ không
			if (string.IsNullOrEmpty(userId))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Sai Id." } }
				};
				return _res;
			}

			// Tìm kiếm người dùng cần xóa
			var userToDelete = await _userManager.FindByIdAsync(userId);

			if (userToDelete == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Không tìm thấy người dùng." } }
				};
				return _res;
			}

			// Kiểm tra xem có tồn tại user quan ly kho
			var usersManageWareHouse = await _unitOfWork.WareHouse.Get(x => x.UserId.Equals(userToDelete.Id), true).FirstOrDefaultAsync();

			if (usersManageWareHouse != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Không thể xóa người dùng này vì người dùng đang quản lý kho {usersManageWareHouse.Name}." } }
				};
				return _res;
			}

			// Kiểm tra xem có tồn tại user lap phieu
			var usersCreatedNote = await _unitOfWork.Note.Get(x => x.UserId.Equals(userToDelete.Id), true).FirstOrDefaultAsync();

			if (usersCreatedNote != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), new List<string> { $"Không thể xóa người dùng này vì người dùng đã ghi phiếu {usersCreatedNote.NoteCode}." } }
				};
				return _res;
			}

			// Xóa hết các claim của người dùng
			var userClaims = await _userManager.GetClaimsAsync(userToDelete);
			foreach (var claim in userClaims)
			{
				await _userManager.RemoveClaimAsync(userToDelete, claim);
			}

			// Xóa người dùng
			var result = await _userManager.DeleteAsync(userToDelete);

			if (!result.Succeeded)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
					{nameof(userId), result.Errors.Select(e => e.Description).ToList() }
				};
				return _res;
			}

			_res.Messages = "Xóa người dùng thành công";
			return _res;
		}

		
	}
}
