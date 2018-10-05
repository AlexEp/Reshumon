using Reshumon.DAL.DTO;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resumon.BE.Models
{
    public static class Extentions
    {
        public static User CreateFrom(this User user, ApplicationUserIdentity userIdentity)
        {
            user.Email = userIdentity.Email;
            user.UserName = userIdentity.UserName;
            return user;
        }
    }
}