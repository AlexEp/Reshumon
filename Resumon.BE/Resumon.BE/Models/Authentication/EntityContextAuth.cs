using Reshumon.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resumon.BE.Models.Authentication
{
    public class EntityContextAuth : EntityContext
    {
        public  EntityContextAuth(string connectionString) : base  (connectionString)
        {
            //override
            this.Users = new UserAuthRepository(connectionString);
        }


    }
}