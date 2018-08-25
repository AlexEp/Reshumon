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
        string ConnectionString = "";
        public UserRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(User entity)
        {
            using (var Context = GetContext())
            {
                Context.Users.Add(entity);
                Context.SaveChanges();
            }

        }

        public void Edit(User entity)
        {
            throw new NotImplementedException();
        }

        public User Get(int Id)
        {
            User results;
            using (var Context = GetContext())
            {
                results = Context.Users.Find(Id);
            }

            return results;
        }

        public IEnumerable<User> GetAll()
        {
            IEnumerable<User> results;
            using (var Context = GetContext())
            {
                results = Context.Users.ToList();
            }

            return results;
        }

        public void Remove(int Id)
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
