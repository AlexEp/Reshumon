using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Reshumon.DAL;
using Reshumon.DAL.DTO;
using Reshumon.DAL.Repositories;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resumon.BE.Models.Authentication
{
    public class UserAuthRepository : UserRepository
    {

        string ConnectionString = "";
        public UserAuthRepository(string connectionString) : base(connectionString)
        {
    
        }




        public override IEnumerable<User> GetAll()
        {
            IEnumerable<User> results;

            var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
            var manager = new UserManager<ApplicationUserIdentity>(userStore);
            var usersAuth = userStore.Users.ToList();

            using (var Context = GetContext())
            {
                results = Context.Users.ToList();
            }

            return results.Select(u =>
            {
                var auth = usersAuth.Where(ua => ua.UserRefID == u.UserID).FirstOrDefault();
                return new UserAuth(u, auth);
            });
         }

        public override void Add(User entity)
        {
            using (var Context = GetContext())
            {
                Context.Users.Add(entity);



                Context.SaveChanges();
            }

        }

        public override void Edit(User entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }


        public override void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var user = Context.Users.FirstOrDefault(u => u.UserID == Id);

                if (user != null)
                {
                    Context.Users.Remove(user);
                    Context.SaveChanges();
                }
            }

        }

        public override void Remove(User entit)
        {
            throw new NotImplementedException();
        }

        public override void RemoveRange(IEnumerable<User> entitList)
        {
            throw new NotImplementedException();
        }

    }
}