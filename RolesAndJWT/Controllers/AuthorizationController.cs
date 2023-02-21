using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using RolesAndJWT.Models;
using RolesAndJWT.Models.Domain;
using RolesAndJWT.Models.Dto;
using RolesAndJWT.Repositories.Abstract;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace RolesAndJWT.Controllers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ITokenService _tokenService;
        public AuthorizationController(DatabaseContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService)
        {
           this._context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
           this._tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);

            if(user!=null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles=await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                };
                foreach(var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role,userRole));
                }
                var token = _tokenService.GetToken(authClaims);
                var refreshToken = _tokenService.GetRefreshToken();
                var tokenInfo = _context.TokenInfo.FirstOrDefault(a => a.Username == user.UserName);
                if(tokenInfo==null)
                {
                    var info = new TokenInfo
                    {
                        Username = user.UserName,
                        RefreshToken = refreshToken,
                        RefreshTokenExpiry = DateTime.Now.AddDays(7)
                    };
                    _context.TokenInfo.AddAsync(info);
                    _context.SaveChanges();
                }
                else
                {
                    tokenInfo.RefreshToken= refreshToken;
                    tokenInfo.RefreshTokenExpiry= DateTime.Now.AddDays(7);
                }
                try
                {
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
                return Ok(new LoginResponse
                {
                    Name = user.Name,
                    Username = user.UserName,
                    Token = token.TokenString,
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo,
                    StatusCode = 1,
                    Message = "Logged In"
                });
            }
            return NotFound(
                new LoginResponse
                {
                    StatusCode = 0,
                    Message = "Invalid Username or password",
                    Token = "", Expiration = null
                });
        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody]RegistrationModel model)
        {
            var status = new Status();
            if (!ModelState.IsValid)
            {
                status.StatusCode = 0;
                status.Message = "Please pass all the required fields";
                return Ok(status);
            }var userExists = await userManager.FindByNameAsync(model.Username);
            if(userExists!=null)
            {
                status.StatusCode = 0;
                status.Message = "Invalid username";
                return Ok(status);
            }
            var user = new ApplicationUser
            {
                UserName=model.Username,
                SecurityStamp=Guid.NewGuid().ToString(),
                Email=model.Email,
                Name = model.Name
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if(!result.Succeeded)
            {
                status.StatusCode = 0;
                status.Message = "User Created Failed";
                return Ok(status);
            }
            if (!await roleManager.RoleExistsAsync(UserRoles.Employee))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Employee));
            if(await roleManager.RoleExistsAsync(UserRoles.Employee))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Employee);
            }
            status.StatusCode = 1;
            status.Message = "Successfully registered";
            return Ok(status);
        }
        //[HttpPost]
        //public async Task<IActionResult> RegistrationAdmin([FromBody] RegistrationModel model)
        //{
        //    var status = new Status();
        //    if (!ModelState.IsValid)
        //    {
        //        status.StatusCode = 0;
        //        status.Message = "Please pass all the required fields";
        //        return Ok(status);
        //    }
        //    var userExists = await userManager.FindByNameAsync(model.Username);
        //    if (userExists != null)
        //    {
        //        status.StatusCode = 0;
        //        status.Message = "Invalid username";
        //        return Ok(status);
        //    }
        //    var user = new ApplicationUser
        //    {
        //        UserName = model.Username,
        //        SecurityStamp = Guid.NewGuid().ToString(),
        //        Email = model.Email,
        //        Name = model.Name
        //    };
        //    var result = await userManager.CreateAsync(user, model.Password);
        //    if (!result.Succeeded)
        //    {
        //        status.StatusCode = 0;
        //        status.Message = "User Created Failed";
        //        return Ok(status);
        //    }
        //    if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        //        await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        //    if (await roleManager.RoleExistsAsync(UserRoles.Admin))
        //    {
        //        await userManager.AddToRoleAsync(user, UserRoles.Admin);
        //    }
        //    status.StatusCode = 1;
        //    status.Message = "Successfully registered";
        //    return Ok(status);
        //}
    }
}
