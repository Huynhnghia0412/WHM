using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

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

			// Kiểm tra xem người dùng có claim tương ứng không, và Value khác 
			var userClaim = user.Claims.FirstOrDefault(c => c.Type == _claimType && (c.Value.Equals("False") || c.Value.Equals("false")));

			// Nếu có user claim tương ứng
			if (userClaim != null)
			{
				// Từ chối truy cập vì có 1 claim có giá trị False
				context.Result = new ForbidResult();
				return;
			}
		}
	}
}