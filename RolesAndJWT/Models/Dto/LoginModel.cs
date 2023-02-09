using System.ComponentModel.DataAnnotations;

namespace RolesAndJWT.Models.Dto
{
    public class LoginModel
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
