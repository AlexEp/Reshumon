using Microsoft.VisualStudio.TestTools.UnitTesting;
using Reshumon.DAL.Repositories;

namespace UnitTest.DAL
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            EntityContext ec = new EntityContext("" +
                "Server=.\\;Database=Reshumon;Trusted_Connection=True;");
            var user = ec.Users.Get(1);
        }
    }
}
