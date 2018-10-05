using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class DailyActivityRepository : IDailyActivityRepository
    {
        string ConnectionString = "";
        public DailyActivityRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(DailyActivity entity)
        {
            using (var Context = GetContext())
            {
                Context.DailyActivities.Add(entity);
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
                results = Context.DailyActivities.Find(Id);
            }

            return results;
        }

        public IEnumerable<DailyActivity> GetAll()
        {
            IEnumerable<DailyActivity> results;
            using (var Context = GetContext())
            {
                results = Context.DailyActivities.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var dailyActivity = Context.DailyActivities.FirstOrDefault(u => u.ActivityID == Id);

                if (dailyActivity != null)
                {
                    Context.DailyActivities.Remove(dailyActivity);
                    Context.SaveChanges();
                }
            }
         
        }

        public void Remove(DailyActivity entity)
        {
            using (var Context = GetContext())
            {

                var dailyActivities = Context.DailyActivities.FirstOrDefault(c => c.ActivityID == entity.ActivityID);

                if (dailyActivities != null)
                {
                    try
                    {
                        Context.DailyActivities.Remove(dailyActivities);
                        Context.SaveChanges();
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }
            }
        }

        public void RemoveRange(IEnumerable<DailyActivity> entitList)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DailyActivity> GetByDate(DateTime from, DateTime to)
        {
            IEnumerable<DailyActivity> results;
            using (var Context = GetContext())
            {
                results = Context.DailyActivities.Where( d => d.StartDate >= from && d.StartDate <= to).ToList();
            }

            return results;
        }
    }
}
