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
        private DataBaseContext EntitiesContext = null;
        public EntityContext(string connectionString)
        {

            //Build an Entity Framework connection string

            EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()
            {
                Provider = "System.Data.SqlClient",
                ProviderConnectionString = connectionString //sqlString.ToString()
            };


            //this.EntitiesContext = new DataBaseContext(entityString.ToString());//new ReshumonEntities(entityString.ToString());
            this.EntitiesContext = new DataBaseContext(connectionString);

            this.Users = new UserRepository(this.EntitiesContext);
            this.Categories = new CategoryRepository(this.EntitiesContext);
            var c = this.Categories.GetAll();
            this.Projects = new ProjectRepository(this.EntitiesContext);

        }

        public IUserRepository Users { get; set; }
        public ICategoryRepository Categories { get; set; }
        public IProjectRepository Projects { get; set; }
     
    }

}
