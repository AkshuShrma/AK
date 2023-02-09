namespace RolesAndJWT.Models.Domain
{
    public class TokenInfo
    {
        public int iD { get; set; }
        public string Username { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}
