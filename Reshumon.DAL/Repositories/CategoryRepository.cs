using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    internal class CategoryRepository : ICategoryRepository
    {
        DataBaseContext Context = null;
        public CategoryRepository(DataBaseContext context)
        {
            this.Context = context;
        }
        public void Add(Category entity)
        {
            Context.Categories.Add(entity);
            Context.SaveChanges();
        }

        public void Edit(Category entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        public Category Get(int Id)
        {
            return Context.Categories.Find(Id);
        }

        public IEnumerable<Category> GetAll()
        {
            return Context.Categories.ToList();
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

        public void Remove(Category entit)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Category> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
