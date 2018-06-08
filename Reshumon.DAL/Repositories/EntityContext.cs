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
        private ReshumonEntities EntitiesContext = null;
        public EntityContext(string connectionString)
        {

            //Build an Entity Framework connection string

            EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()
            {
                Provider = "System.Data.SqlClient",
                Metadata = "res://*/DTO.Model1.csdl|res://*/DTO.Model1.ssdl|res://*/DTO.Model1.msl",
                ProviderConnectionString = connectionString //sqlString.ToString()
            };


            this.EntitiesContext = new ReshumonEntities(entityString.ToString());
        
            this.Users = new UserRepository(this.EntitiesContext);
            this.Projects = new ProjectRepository(this.EntitiesContext);

        }

        public IUserRepository Users { get; set; }
        public IProjectRepository Projects { get; set; }
     
    }

}
