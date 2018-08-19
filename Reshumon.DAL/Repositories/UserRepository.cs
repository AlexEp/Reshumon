using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    internal class UserRepository : IUserRepository
    {
        DataBaseContext Context = null;
        public UserRepository(DataBaseContext context)
        {
            this.Context = context;
        }
        public void Add(User entity)
        {
            Context.Users.Add(entity);
            Context.SaveChanges();
        }

        public void Edit(User entity)
        {
            throw new NotImplementedException();
        }

        public User Get(int Id)
        {
            return Context.Users.Find(Id);
        }

        public IEnumerable<User> GetAll()
        {
            return Context.Users.ToList();
        }

        public void Remove(int Id)
        {
            var user = Context.Users.FirstOrDefault(u => u.UserID == Id);

            if (user != null)
            {
                Context.Users.Remove(user);
                Context.SaveChanges();
            }
         
        }

        public void Remove(User entit)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<User> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
