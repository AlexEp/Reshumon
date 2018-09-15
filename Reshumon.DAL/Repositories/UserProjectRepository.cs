using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{

   

    internal class UserProjectRepository : IUserProjectRepository
    {
        string ConnectionString = "";
        public UserProjectRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(UserProject entity)
        {
            using (var Context = GetContext())
            {
                Context.UserProject.Add(entity);
                Context.SaveChanges();
            }

        }

        public void AddRange(IEnumerable<UserProject> entities)
        {
            using (var Context = GetContext())
            {
                Context.UserProject.AddRange(entities);
                Context.SaveChanges();
            }

        }

        public void Edit(UserProject entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public UserProject Get(int Id)
        {
            UserProject results;
            using (var Context = GetContext())
            {
                results = Context.UserProject.Find(Id);
            }

            return results;
        }

        public IEnumerable<UserProject> GetAll()
        {
            IEnumerable<UserProject> results;
            using (var Context = GetContext())
            {
                results = Context.UserProject.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var userProject = Context.UserProject.FirstOrDefault(u => u.ID == Id);

                if (userProject != null)
                {
                    Context.UserProject.Remove(userProject);
                    Context.SaveChanges();
                }
            }
         
        }

        public void Remove(UserProject entity)
        {
            using (var Context = GetContext())
            {
                Context.UserProject.Remove(entity);
            }
        }

        public void RemoveRange(IEnumerable<UserProject> entityList)
        {
            using (var Context = GetContext())
            {
                Context.UserProject.RemoveRange(entityList);
            }
        }

        public void RemoveRange(Project project)
        {
            using (var Context = GetContext())
            {
              var entityList = Context.UserProject.Where(up => up.ProjectID == project.ProjectID);
              Context.UserProject.RemoveRange(entityList);
                Context.SaveChanges();
            }
        }

        public void RemoveRange(User user)
        {
            using (var Context = GetContext())
            {
                var entityList = Context.UserProject.Where(up => up.UserID == user.UserID);
                Context.UserProject.RemoveRange(entityList);
                Context.SaveChanges();
            }
        }
    }
}
