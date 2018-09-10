using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    internal class DailyActivityRepository : IDailyActivityRepository
    {
        string ConnectionString = "";
        public DailyActivityRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(DailyActivity entity)
        {
            using (var Context = GetContext())
            {
                Context.DailyActivity.Add(entity);
                Context.SaveChanges();
            }

        }

        public void Edit(DailyActivity entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public DailyActivity Get(int Id)
        {
            DailyActivity results;
            using (var Context = GetContext())
            {
                results = Context.DailyActivity.Find(Id);
            }

            return results;
        }

        public IEnumerable<DailyActivity> GetAll()
        {
            IEnumerable<DailyActivity> results;
            using (var Context = GetContext())
            {
                results = Context.DailyActivity.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var dailyActivity = Context.DailyActivity.FirstOrDefault(u => u.ActivityID == Id);

                if (dailyActivity != null)
                {
                    Context.DailyActivity.Remove(dailyActivity);
                    Context.SaveChanges();
                }
            }
         
        }

        public void Remove(DailyActivity entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<DailyActivity> entitList)
        {
            throw new NotImplementedException();
        }
    }
}
