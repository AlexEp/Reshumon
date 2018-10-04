using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Reshumon.DAL.DTO;
using Resumon.BE.Models;
using Resumon.BE.Models.Authentication;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Resumon.BE.Controllers
{
    [RoutePrefix("api/v1/account")]
    public class AccountAPIController : ApiController
    {
        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public IdentityResult Register(RegisterViewModel model)
        {
            var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
            var userManager = new UserManager<ApplicationUserIdentity>(userStore);
            IdentityResult result;

            var user = new User()
            {
                LastName = model.LastName,
                FirstName = model.FirstName,
                JoinDate = DateTime.Now,
                IsActive = true,
                IsUseDiningRoom = model.IsUseDiningRoom
            };

            ServiceProvider.EntityContext.Users.Add(user);


                //Try to Add  Identity
                var userIdentity = new ApplicationUserIdentity
                {
                    UserName = model.Email,
       
                    Email = model.Email,
                    UserRefID = user.UserID
                };


                userManager.PasswordValidator = new PasswordValidator
                {
                    RequiredLength = 3
                };

                try
                {
                    result = userManager.Create(userIdentity, model.Password);
                    userManager.AddToRole(userIdentity.Id, "Employee");
                }
                catch (Exception)
                {
                    if (string.IsNullOrEmpty(userIdentity.Id))
                    {
                        ServiceProvider.EntityContext.Users.Remove(user);
                    }
                    throw;
                }
           

            return result;
        }

        [HttpGet]
        [Route("GetAllRoles")]
        [AllowAnonymous]
        public HttpResponseMessage GetRoles()
        {
            var roleStore = new RoleStore<IdentityRole>(new AuthenticationDbContext());
            var roleMngr = new RoleManager<IdentityRole>(roleStore);

            var roles = roleMngr.Roles
                .Select(x => new { x.Id, x.Name })
                .ToList();
            return this.Request.CreateResponse(HttpStatusCode.OK, roles);
        }

        [Authorize]
        [HttpGet]
        [Route("GetUserClaims")]
        public UserProfileModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;

            var UserName = identityClaims.FindFirst("Username").Value;
            var Email = identityClaims.FindFirst("Email").Value;
            var strUserRefID = identityClaims.FindFirst("UserRefID").Value;

            var user = ServiceProvider.EntityContext.Users.Get(int.Parse(strUserRefID));

            var FirstName = user.FirstName; //identityClaims.FindFirst("FirstName").Value;
            var LastName = user.LastName;//identityClaims.FindFirst("LastName").Value;


            UserProfileModel model = new UserProfileModel()
            {
                UserName = UserName,
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
            };
            return model;
        }
    }
}
