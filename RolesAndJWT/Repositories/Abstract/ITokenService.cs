using RolesAndJWT.Models.Dto;
using System.Security.Claims;

namespace RolesAndJWT.Repositories.Abstract
{
    public interface ITokenService
    {
        TokenResponse GetToken(IEnumerable<Claim> claim);
        string GetRefreshToken();
        ClaimsPrincipal GetPrincipleFromExpiredToken(string token);
    }
}
