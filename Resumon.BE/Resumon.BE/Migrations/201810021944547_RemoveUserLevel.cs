namespace Resumon.BE.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveUserLevel : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AspNetUser", "Level");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUser", "Level", c => c.Byte(nullable: false));
        }
    }
}
