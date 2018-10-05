using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{
    public class EntityContext : IEntityContext
    {
        public EntityContext(string connectionString)
        {

            this.Users = new UserRepository(connectionString);
            this.Categories = new CategoryRepository(connectionString);
            this.Projects = new ProjectRepository(connectionString);
            this.DailyActivity = new DailyActivityRepository(connectionString);
            this.UserProject = new UserProjectRepository(connectionString);
            this.UserFavorites = new UserFavoriteRepository(connectionString);
        }

        public IUserRepository Users { get; set; }
        public ICategoryRepository Categories { get; set; }
        public IProjectRepository Projects { get; set; }
        public IDailyActivityRepository DailyActivity { get; }
        public IUserProjectRepository UserProject { get; }
        public IUserFavoriteRepository UserFavorites { get;  }
    }

}
