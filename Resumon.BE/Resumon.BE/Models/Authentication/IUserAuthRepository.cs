using Reshumon.DAL;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resumon.BE.Models.Authentication
{
    public interface IUserAuthRepository : IGenericRepository<UserAuth>
    {
    }

}
