using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;

namespace Reshumon.DAL.Repositories
{

    class ProjectRepository : IProjectRepository
    {
        ReshumonEntities Context = null;
        public ProjectRepository(ReshumonEntities context)
        {
            this.Context = context;
        }
        public void Add(Project entit)
        {
            throw new NotImplementedException();
        }

        public void Edit(Project entit)
        {
            throw new NotImplementedException();
        }

        public Project Get(int Id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> GetAll()
        {
            throw new NotImplementedException();
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
