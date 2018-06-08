
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Reshumon.Common
{
    public class KeyValue
    {
        [XmlAttribute("key")]
        public string Key { get; set; }
        [XmlAttribute("value")]
        public string Value { get; set; }
    }

    [XmlRoot("GeneralSettings")]
    public class GeneralKeyValueParser
    {
        public GeneralKeyValueParser()
        {
            this.Settings = new List<KeyValue>();
        }

        [XmlArray("Settings")]
        [XmlArrayItem("add")]
        public List<KeyValue> Settings { get; set; }
    }

    public class GeneralConfig
    {
        public string ConfigFilePath { get; }
        GeneralKeyValueParser AppConfigs;

        public GeneralConfig(string configFilePath)
        {
            this.ConfigFilePath = configFilePath;
            this.AppConfigs = Utilities.LoadXML<GeneralKeyValueParser>(configFilePath);
        }

        public string GetParam(string key)
        {
            var value = this.AppConfigs.Settings.FirstOrDefault<KeyValue>(k => k.Key == key);
            return value != null ? value.Value : string.Empty;
        }
    }

 
}
