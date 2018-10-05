using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class CategoryRepository : ICategoryRepository
    {

        string ConnectionString = "";
        public CategoryRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }
        public void Add(Category entity)
        {
            using (var Context = GetContext())
            {
                Context.Categories.Add(entity);
                Context.SaveChanges();
            }
        }

        public void Edit(Category entity)
        {
            using (var Context = GetContext())
            {

                var trackedEntity = Context.Categories.FirstOrDefault(e => e.CategoryID == entity.CategoryID);
                if (trackedEntity != null)
                {
                    trackedEntity.Name = entity.Name;
                    trackedEntity.IsActive = entity.IsActive;

                    Context.SaveChanges();
                }
            }
        }

        public Category Get(int Id)
        {
            Category results;
            using (var Context = GetContext())
            {
                results = Context.Categories.Find(Id);
            }

            return results;
        }

        public IEnumerable<Category> GetAll()
        {
            IEnumerable<Category> results;
            using (var Context = GetContext())
            {
                results = Context.Categories.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {

                var categoty = Context.Categories.FirstOrDefault(c=> c.CategoryID == Id);

                if (categoty != null)
                {
                        Context.Categories.Remove(categoty);
                        Context.SaveChanges();
                }
            }
        }

        public void Remove(Category entity)
        {
            Remove(entity.CategoryID);
        }

        public void RemoveRange(IEnumerable<Category> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
