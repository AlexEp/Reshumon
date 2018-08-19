using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Reshumon.DAL.Repositories
{

    class ProjectRepository : IProjectRepository
    {
        DataBaseContext Context = null;
        public ProjectRepository(DataBaseContext context)
        {
            this.Context = context;
        }
        public void Add(Project entity)
        {
            Context.Projects.Add(entity);
            Context.SaveChanges();
        }

        public void Edit(Project entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        public Project Get(int Id)
        {
            return Context.Projects.Find(Id);
        }

        public IEnumerable<Project> GetAll()
        {
            return Context.Projects.ToList();
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
