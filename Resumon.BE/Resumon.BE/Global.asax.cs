using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Reshumon.Common;
using Reshumon.DAL.DTO;
using Reshumon.DAL.Repositories;
using Resumon.BE.Models;
using Resumon.BE.Models.Authentication;
using Resumon.Common.interfaces;
using Resumon.Common.Mocks;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
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
            ///////////////////////////////
            // 1. Load Services

            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            // ** Logger **
            ILoggerService logger = new MockLoggerService(); //Using Mock for now
            ServiceProvider.Initialization(logger);
            ServiceProvider.LoggerService.Logger.Debug("Module Loaded: Logger");

            // ** DAL **
            //Load configs
            GeneralConfig dalConfig = new GeneralConfig(Path.Combine(baseDirectory,"Dal.Config.xml"));
          
     
            EntityContext entityContext = new EntityContext(dalConfig.GetParam("SqlDatabaseConnection"));
            ServiceProvider.Initialization(entityContext);
            ServiceProvider.LoggerService.Logger.Debug("Module Loaded: DAL");

            ///////////////////////////////
            // 2. JSON formatter setting
            var formatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            formatter.SerializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                TypeNameHandling = TypeNameHandling.Objects,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            ///////////////////////////////
            // 3. ASP.NET Configurations loading
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var  version = Assembly.GetExecutingAssembly().GetName().Version;
            ServiceProvider.LoggerService.Logger.Info($"Application Start. V{version}");
        }
    }
}
