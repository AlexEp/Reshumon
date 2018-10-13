using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(string connectionString) : base(connectionString)
        {

        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }
        public DbSet<DailyActivity> DailyActivities { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }
        public DbSet<DiningRoomUse> DiningRoomUse { get; set; }
    }

}
