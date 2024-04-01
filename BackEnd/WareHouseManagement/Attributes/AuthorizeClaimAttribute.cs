using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Attributes
{
	[AttributeUsage(AttributeTargets.Method)]
	public class AuthorizeClaimAttribute : Attribute, IAuthorizationFilter
	{
		private readonly string _claimType;

		public AuthorizeClaimAttribute(string claimType)
		{
			_claimType = claimType;
		}

		public void OnAuthorization(AuthorizationFilterContext context)
		{
			var user = context.HttpContext.User;

			if (!user.Identity.IsAuthenticated)
			{
				context.Result = new UnauthorizedResult();
				return;
			}

			// lấy roleclaim từ token
			var roleClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

			if (string.IsNullOrEmpty(roleClaim))
			{
				context.Result = new ForbidResult();
				return;
			}

			// kiểm tra có phải admin
			if (!roleClaim.Equals(SD.Role_Admin))
			{
				var claimInToken = user.Claims.FirstOrDefault(c => c.Type == _claimType && c.Value == "True");

				if (claimInToken == null)
				{
					context.Result = new ForbidResult();
					return;
				}
			}
		}
	}
}