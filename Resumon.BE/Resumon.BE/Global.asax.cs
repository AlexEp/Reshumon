using Reshumon.Common;
using Reshumon.DAL.DTO;
using Reshumon.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Reshumon.BE
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
         
            //Load configs
            GeneralConfig dalConfig = new GeneralConfig(Path.Combine(baseDirectory,"Dal.Config.xml"));
          
            //Init DAL
             EntityContext ec = new EntityContext(dalConfig.GetParam("SqlDatabaseConnection"));

            ec.Users.Add(new DAL.DTO.User() {Name = "DAvid",LastName="Lastin" });


            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
