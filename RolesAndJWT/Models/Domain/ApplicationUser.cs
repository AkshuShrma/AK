using Microsoft.AspNetCore.Identity;

namespace RolesAndJWT.Models.Domain
{
    public class ApplicationUser:IdentityUser
    {
        public string? Name { get; set; }
    }
}
