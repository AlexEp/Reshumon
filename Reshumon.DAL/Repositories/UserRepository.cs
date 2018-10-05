using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class UserRepository : IUserRepository
    {
        string ConnectionString = "";
        public UserRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public virtual void Add(User entity)
        {
            using (var Context = GetContext())
            {
                Context.Users.Add(entity);
                Context.SaveChanges();
            }

        }

        public virtual void Edit(User entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public virtual User Get(int Id)
        {
            User results;
            using (var Context = GetContext())
            {
                results = Context.Users.Find(Id);
            }

            return results;
        }

        public virtual IEnumerable<User> GetAll()
        {
            IEnumerable<User> results;
            using (var Context = GetContext())
            {
                results = Context.Users.ToList();
            }

            return results;
        }

        public virtual void Remove(int Id)
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

        public virtual void Remove(User entit)
        {
            throw new NotImplementedException();
        }

        public virtual void RemoveRange(IEnumerable<User> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
