using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Reshumon.Common;
using Reshumon.DAL.DTO;
using Reshumon.DAL.Repositories;
using Resumon.BE.Models;
using Resumon.BE.Models.Authentication;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Globalization;
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
             EntityContext entityContext = new EntityContext(dalConfig.GetParam("SqlDatabaseConnection"));

            //Init Services
            ServiceProvider.Init(entityContext);

            IsoDateTimeConverter converter = new IsoDateTimeConverter
            {
                DateTimeStyles = DateTimeStyles.AdjustToUniversal,
                DateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ssK"
            };



            var formatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            formatter.SerializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                TypeNameHandling = TypeNameHandling.Objects,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
           
            formatter.SerializerSettings.Converters.Add(converter);

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
