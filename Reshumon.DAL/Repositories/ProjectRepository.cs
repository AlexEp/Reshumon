using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Reshumon.DAL.Repositories
{

    class ProjectRepository : IProjectRepository
    {
        string ConnectionString = "";

        public ProjectRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private DataBaseContext GetContext() {
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

        public void Remove(int Id)
        {
            throw new NotImplementedException();
        }

        public void Remove(Project entit)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Project> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
