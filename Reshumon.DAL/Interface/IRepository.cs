using Reshumon.DAL.DTO;
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


    public interface IProjectRepository : IGenericRepository<Project>
    {
    }

    public interface IUserRepository : IGenericRepository<User>
    {
    }

    public interface IUserFavoriteRepository : IGenericRepository<UserFavorite>
    {
    }
    

    public interface ICategoryRepository : IGenericRepository<Category>
    {
    }

    public interface IDailyActivityRepository : IGenericRepository<DailyActivity>
    {
        IEnumerable<DailyActivity> GetByDate(DateTime from, DateTime to);
    }

    public interface IUserProjectRepository : IGenericRepository<UserProject>
    {
        void RemoveRange(Project project);
        void RemoveRange(User user);
        void AddRange(IEnumerable<UserProject> entities);
    }

}

