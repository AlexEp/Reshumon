using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Resumon.BE.Models;
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
        [Route("register")]
        [HttpPost]
        public IdentityResult Register(RegisterViewModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);

            var user = new ApplicationUser
            {
                UserName = model.Email,
                LastName = model.LastName,
                FirstName = model.FirstName,
                JoinDate = DateTime.Now,
                Email = model.Email,
            };

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            IdentityResult result = manager.Create(user, model.Password);
            return result;
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
            var FirstName = identityClaims.FindFirst("FirstName").Value;
            var LastName = identityClaims.FindFirst("LastName").Value;
            var level = identityClaims.FindFirst("level").Value;

            UserProfileModel model = new UserProfileModel()
            {
                UserName = UserName,
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
                Level = identityClaims.FindFirst("Level").Value
            };
            return model;
        }
    }
}
