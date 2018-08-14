using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class CategoryRepository : ICategoryRepository
    {
        ReshumonEntities Context = null;
        public CategoryRepository(ReshumonEntities context)
        {
            this.Context = context;
        }
        public void Add(Category entity)
        {
            Context.Category.Add(entity);
            Context.SaveChanges();
        }

        public void Edit(Category entity)
        {
            throw new NotImplementedException();
        }

        public Category Get(int Id)
        {
            return Context.Category.Find(Id);
        }

        public IEnumerable<Category> GetAll()
        {
            return Context.Category.ToList();
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
