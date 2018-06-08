using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL
{
    public interface IEntityContext
    {
        IUserRepository Users { get; }
        IProjectRepository Projects { get; }

    }
}
