using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Resumon.BE.Models.ViewModels
{
    //public class UserAuth : User
    //{

    //    public UserAuth()
    //    {

    //    }

    //    public UserAuth(User user, ApplicationUserIdentity userIdentity)
    //    {
            
    //        this.UserID = user.UserID;
    //        this.FirstName = user.FirstName;
    //        this.LastName = user.LastName;
    //        this.JoinDate = user.JoinDate;
    //        this.IsUseDiningRoom = user.IsUseDiningRoom;
    //        this.IsActive = user.IsActive;

    //        this.UserName = userIdentity.UserName;
    //        this.Email = userIdentity.Email;
    //    }

    //    public string UserName { get; set; }

    //    public string Email { get; internal set; }

    //}

    public class ApplicationUserIdentity : IdentityUser
    {

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUserIdentity> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }


        public int UserRefID { get; set; }

    }
}