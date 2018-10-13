using Reshumon.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{


    public class DiningRoomUseRepository : IDiningRoomUseRepository
    {
        string ConnectionString = "";
        public DiningRoomUseRepository(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        protected DataBaseContext GetContext()
        {
            return new DataBaseContext(this.ConnectionString);
        }

        public void Add(DiningRoomUse entity)
        {
            using (var Context = GetContext())
            {
                Context.DiningRoomUse.Add(entity);
                Context.SaveChanges();
            }

        }

        public void Edit(DiningRoomUse entity)
        {
            using (var Context = GetContext())
            {
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }

        public DiningRoomUse Get(int Id)
        {
            DiningRoomUse results;
            using (var Context = GetContext())
            {
                results = Context.DiningRoomUse.Find(Id);
            }

            return results;
        }

        public IEnumerable<DiningRoomUse> GetAll()
        {
            IEnumerable<DiningRoomUse> results;
            using (var Context = GetContext())
            {
                results = Context.DiningRoomUse.ToList();
            }

            return results;
        }

        public void Remove(int Id)
        {
            using (var Context = GetContext())
            {
                var DiningRoomUse = Context.DiningRoomUse.FirstOrDefault(u => u.DiningRoomUseID == Id);

                if (DiningRoomUse != null)
                {
                    Context.DiningRoomUse.Remove(DiningRoomUse);
                    Context.SaveChanges();
                }
            }
         
        }

        public void Remove(DiningRoomUse entity)
        {
            using (var Context = GetContext())
            {

                var DiningRoomUse = Context.DiningRoomUse.FirstOrDefault(c => c.DiningRoomUseID == entity.DiningRoomUseID);

                if (DiningRoomUse != null)
                {
                    try
                    {
                        Context.DiningRoomUse.Remove(DiningRoomUse);
                        Context.SaveChanges();
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }
            }
        }

        public void RemoveRange(IEnumerable<DiningRoomUse> entitList)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DiningRoomUse> GetByDate(DateTime from, DateTime to)
        {
            IEnumerable<DiningRoomUse> results;
            using (var Context = GetContext())
            {
                results = Context.DiningRoomUse.Where( d => d.Date >= from && d.Date < to).ToList();
            }

            return results;
        }
    }
}
