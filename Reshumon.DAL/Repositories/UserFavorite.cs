using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class UserFavoriteRepository : IUserFavoriteRepository
    {
        string ConnectionString = "";
        public UserFavoriteRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(UserFavorite entity)
        {
            using (var Context = GetContext())
            {
                Context.UserFavorites.Add(entity);
                Context.SaveChanges();
            }

        }

        public void Edit(UserFavorite entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public UserFavorite Get(int Id)
        {
            UserFavorite results;
            using (var Context = GetContext())
            {
                results = Context.UserFavorites.Find(Id);
            }

            return results;
        }

        public IEnumerable<UserFavorite> GetAll()
        {
            IEnumerable<UserFavorite> results;
            using (var Context = GetContext())
            {
                results = Context.UserFavorites.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var userFavorites = Context.UserFavorites.FirstOrDefault(u => u.UserID == Id);

                if (userFavorites != null)
                {
                    Context.UserFavorites.Remove(userFavorites);
                    Context.SaveChanges();
                }
            }
         
        }

        public void Remove(UserFavorite entit)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<UserFavorite> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
