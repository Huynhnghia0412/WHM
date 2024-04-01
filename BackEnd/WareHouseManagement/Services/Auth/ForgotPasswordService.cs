using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Data;
using WareHouseManagement.DataAccess.Repository;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;
using WareHouseManagement.Models.DTO.Auth;
using WareHouseManagement.Models.DTO.ForgotPassword;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.Auth.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Services.Auth
{
	public class ForgotPasswordService : ControllerBase, IForgotPasswordService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly ApplicationDbContext _db;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly Interfaces.IMailService _mailService; // Đối tượng dịch vụ gửi email
		private ApiResponse<object> _res;

		public ForgotPasswordService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, Interfaces.IMailService mailService, ApplicationDbContext db)
		{
			_unitOfWork = unitOfWork;
			_userManager = userManager;
			_mailService = mailService;
			_db = db;
			_res = new();
		}

		public async Task<ApiResponse<object>> ForgotPassword(ForgotPasswordRequestDTO model)
		{
			var user = await _db.ApplicationUsers.FirstOrDefaultAsync(x => x.Email.Equals(model.Email));

			if (user == null)
			{
				_res.Errors = new Dictionary<string, List<string>>
						{
							{ nameof(ForgotPasswordRequestDTO.Email), new List<string> { $"Email không tồn tại." }}
						};
				_res.IsSuccess = false;
				return _res;
			}

			var token = await _userManager.GeneratePasswordResetTokenAsync(user);
			string link = $"href='http://localhost:3000/changePassword?userId={user.Id}&resetToken={token}'";
			string mailBody = MailBody.RenderMailbody(user.FullName, link, "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
			string subject = "Reset Password";

			// Gửi email chứa mã xác nhận
			await _mailService.SendEmailAsync(user.FullName, user.Email, subject, mailBody);

			_res.Messages = "Email đặt lại mật khẩu đã được gửi";
			return _res;
		}

		public async Task<ApiResponse<object>> ChangePassword(ChangePasswordRequestDTO model)
		{
			var user = await _db.ApplicationUsers.FirstOrDefaultAsync(x => x.Id.Equals(model.UserId));

			if (user == null)
			{
				_res.Errors = new Dictionary<string, List<string>>
				{
					{ nameof(ChangePasswordRequestDTO.UserId), new List<string> { $"Không tìm thấy người dùng." }}
				};
				_res.IsSuccess = false;
				return _res;
			}

			var result = await _userManager.ResetPasswordAsync(user, model.ResetToken, model.Password);

			if (result.Succeeded)
			{
				_res.Messages = "Đổi mật khẩu thành công";
				return _res;
			}

			// Xử lý lỗi cụ thể từ UserManager
			//_res.Errors = new Dictionary<string, List<string>>();
			//foreach (var error in result.Errors)
			//{
			//	if (!_res.Errors.ContainsKey(error.Code))
			//	{
			//		_res.Errors[error.Code] = new List<string>();
			//	}
			//	_res.Errors[error.Code].Add(error.Description);
			//}
			_res.Errors = new Dictionary<string, List<string>>
				{
					{ nameof(ChangePasswordRequestDTO.Password), new List<string> { $"Token đã được dùng để đổi mật khẩu, hãy gửi lại email đổi mật khẩu." }}
				};
			_res.IsSuccess = false;
			return _res;
		}

	}
}
