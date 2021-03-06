﻿using Reshumon.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.Repositories
{
    public interface IEntityContext
    {
        IUserRepository Users { get; }
        IProjectRepository Projects { get; }
        ICategoryRepository Categories { get; }
        IDailyActivityRepository DailyActivity { get; }
        IUserProjectRepository UserProject { get; }
        IUserFavoriteRepository UserFavorites { get; }
        IDiningRoomUseRepository DiningRoomUse { get; }
    }
}
