using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Reshumon.DAL.Repositories
{

    public class ProjectRepository : IProjectRepository
    {
        string ConnectionString = "";

        public ProjectRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext() {
            return new DataBaseContext(this.ConnectionString);
        }

       
        public void Add(Project entity)
        {
            using (var Context = GetContext())
            {
                Context.Projects.Add(entity);
                Context.SaveChanges();
            }
        }

        public void Edit(Project entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public Project Get(int Id)
        {
            Project results;
            using (var Context = GetContext())
            {
                results = Context.Projects.Find(Id);
            }

            return results;
        }

        public IEnumerable<Project> GetAll()
        {
            IEnumerable<Project> results;
            using (var Context = GetContext())
            {
                results = Context.Projects.ToList();
            }

            return results;
        }


        public IList<Project> Get(User user)
        {
            IList<Project> results;
            using (var Context = GetContext())
            {
                var userProjects = Context.UserProjects.Where(up => up.UserID == user.UserID);

                results = Context.Projects.Where(p => userProjects.Count(up => up.ProjectID == p.ProjectID) > 0 ).ToList();
            }
            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {

                var projects = Context.Projects.FirstOrDefault(c => c.ProjectID == Id);

                if (projects != null)
                {
                    try
                    {
                        Context.Projects.Remove(projects);
                        Context.SaveChanges();
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }
            }
        }

        public void Remove(Project entit)
        {
            Remove(entit.ProjectID);
        }

        public void RemoveRange(IEnumerable<Project> entitList)
        {
            throw new NotImplementedException();
        }

     
    }
}
