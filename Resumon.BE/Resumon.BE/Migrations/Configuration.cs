namespace Resumon.BE.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Reshumon.Common;
    using Reshumon.DAL.DTO;
    using Reshumon.DAL.Repositories;
    using Resumon.BE.Models;
    using Resumon.BE.Models.Authentication;
    using Resumon.BE.Models.ViewModels;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.IO;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AuthenticationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AuthenticationDbContext context)
        {
            ///////////////////////////
            //Create Init DATA


            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            
            if (!context.Roles.Any(r => r.Name == "Employee"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Employee" };

                manager.Create(role);
            }



            if (!context.Users.Any(u => u.UserName == "Admin"))
            {
                var store = new UserStore<ApplicationUserIdentity>(context);
                var manager = new UserManager<ApplicationUserIdentity>(store);


                var user = new User()
                {
                    LastName = "Admin",
                    FirstName = "Admin",
                    JoinDate = DateTime.Now,
                    IsActive = true,
                    IsUseDiningRoom = false
                };

                var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                //Load configs
                GeneralConfig dalConfig = new GeneralConfig(Path.Combine(baseDirectory, "Dal.Config.xml"));
                EntityContext entityContext = new EntityContext(dalConfig.GetParam("SqlDatabaseConnection"));

                entityContext.Users.Add(user);

                var userIdentity = new ApplicationUserIdentity
                {
                    UserName = "Admin",
                    Email = "Admin@Admin.com",
                    UserRefID = user.UserID
                };

                manager.Create(userIdentity, "Admin12345");
                manager.AddToRole(userIdentity.Id, "Admin");
            }
        }
    }
}
