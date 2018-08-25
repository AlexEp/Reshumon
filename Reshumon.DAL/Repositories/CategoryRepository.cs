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
            var trackedEntity = Context.Categories.FirstOrDefault(e => e.CategoryID == entity.CategoryID);
            if (trackedEntity != null)
            {
                trackedEntity.Name = entity.Name;
                trackedEntity.IsActive = entity.IsActive;

                Context.SaveChanges();
            }


         
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

        public void Remove(Category entity)
        {
             Context.Categories.Remove(entity);
            Context.SaveChanges();
        }

        public void RemoveRange(IEnumerable<Category> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
