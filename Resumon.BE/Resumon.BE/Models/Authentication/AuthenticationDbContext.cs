using Microsoft.AspNet.Identity.EntityFramework;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Resumon.BE.Models.Authentication
{
    public class AuthenticationDbContext : IdentityDbContext<ApplicationUserIdentity>
    {
        public AuthenticationDbContext()
            : base("IdentityConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //AspNetUsers -> User
            modelBuilder.Entity<ApplicationUserIdentity>()
                .ToTable("AspNetUser");
            //AspNetRoles -> Role
            modelBuilder.Entity<IdentityRole>()
                .ToTable("AspNetRole");
            //AspNetUserRoles -> UserRole
            modelBuilder.Entity<IdentityUserRole>()
                .ToTable("AspNetUserRole");
            //AspNetUserClaims -> UserClaim
            modelBuilder.Entity<IdentityUserClaim>()
                .ToTable("AspNetUserClaim");
            //AspNetUserLogins -> UserLogin
            modelBuilder.Entity<IdentityUserLogin>()
                .ToTable("AspNetUserLogin");
        }



        public static AuthenticationDbContext Create()
        {
            return new AuthenticationDbContext();
        }

    }
}