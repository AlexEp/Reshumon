using Resumon.Common.interfaces;

namespace Resumon.Common.Mocks
{
    //Singleton MockLogger
    public class MockLogger : ILogger
    {
        private static readonly MockLogger m_instance = new MockLogger();
        private MockLogger()
        {

        }

        public static MockLogger Instance
        {
            get
            {
                return m_instance;
            }
        }

        public void Debug(object message)
        {
            //Do nothing
        }

        public void Error(object message)
        {
            //Do nothing
        }

        public void Fatal(object message)
        {
            //Do nothing
        }

        public void Info(object message)
        {
            //Do nothing
        }

        public void Warn(object message)
        {
            //Do nothing
        }
    }
    public class MockLoggerService : ILoggerService
    {

        public MockLoggerService()
        {

        }
        public ILogger Logger { get { return MockLogger.Instance; } }

        public void SetLogicalThread(string property, string value)
        {
            //Do nothing
        }

        public void SetThreadContext(string property, string value)
        {
            //Do nothing
        }
    }
}