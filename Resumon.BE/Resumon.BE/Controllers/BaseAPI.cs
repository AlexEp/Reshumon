using Reshumon.DAL.DTO;
using Resumon.BE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace Resumon.BE.Controllers
{
    public abstract class BaseAPI : ApiController
    {

        protected int GetUserID()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;

            var uerRefID = int.Parse(identityClaims.FindFirst("UserRefID").Value);
            return uerRefID;
        }

        protected User GetUser()
        {
            return ServiceProvider.EntityContext.Users.Get(GetUserID());
            //var Role = identityClaims.FindFirst(ClaimTypes.Role).Value;
            //var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
            //var manager = new UserManager<ApplicationUserIdentity>(userStore);
            //var usersAuth = userStore.Users.ToList();
        }

        protected string GetRoles()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            var role = identityClaims.FindFirst(ClaimTypes.Role).Value;

            return role;

        }


    }
}