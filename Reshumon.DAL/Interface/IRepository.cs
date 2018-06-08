using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL
{
    public interface IGenericRepository<TEntity>
    {
        void Add(TEntity entity);
        void Edit(TEntity entity);
        void Remove(int Id);
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entityList);
        TEntity Get(int Id);
        IEnumerable<TEntity> GetAll();
    
    }



} 

