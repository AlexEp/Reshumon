using Reshumon.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resumon.BE.Models
{
    public class ServiceProvider
    {
        private static IEntityContext m_EntityContext = null;
        //private static PIM.ERP.IDataService m_dataService = null;
        //private static IAppConfig m_appConfig = null;

        public static void Init(IEntityContext entityContext)
        {
            m_EntityContext = entityContext;
            //m_dataService = dataService;
            //m_appConfig = config;
        }

        public static IEntityContext EntityContext { get { return m_EntityContext; } }
        //public static IAppConfig AppConfig { get { return m_appConfig; } }
        //public static PIM.ERP.IDataService DataService { get { return m_dataService; } }
        //public static PIM.ERP.Common.ILoggerService LoggerService { get { return m_logger; } }

    }
}