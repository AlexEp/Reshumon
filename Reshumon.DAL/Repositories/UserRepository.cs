using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class UserRepository : IUserRepository
    {
        ReshumonEntities Context = null;
        public UserRepository(ReshumonEntities context)
        {
            this.Context = context;
        }
        public void Add(User entity)
        {
            Context.User.Add(entity);
            Context.SaveChanges();
        }

        public void Edit(User entity)
        {
            throw new NotImplementedException();
        }

        public User Get(int Id)
        {
            return Context.User.Find(Id);
        }

        public IEnumerable<User> GetAll()
        {
            return Context.User.ToList();
        }

        public void Remove(int Id)
        {
            var user = Context.User.FirstOrDefault(u => u.UserID == Id);

            if (user != null)
            {
                Context.User.Remove(user);
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
