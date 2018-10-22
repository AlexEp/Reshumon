using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resumon.Common.interfaces
{
    public interface ILoggerService
    {
        ILogger Logger { get; }

        void SetThreadContext(string property, string value);
        void SetLogicalThread(string property, string value);
    }

    public interface ILogger
    {
        void Debug(object message);
        void Error(object message);
        void Warn(object message);
        void Info(object message);
        void Fatal(object message);
    }

}
