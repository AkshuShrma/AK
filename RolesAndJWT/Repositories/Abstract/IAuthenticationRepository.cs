using RolesAndJWT.Models.Domain;
using RolesAndJWT.Models.Dto;

namespace RolesAndJWT.Repositories.Abstract
{
    public interface IAuthenticationRepository
    {
        Task<bool> Authenicate(LoginModel model);

        Task<bool> RegisterUser(ApplicationUser userCredentials);
    }
}
