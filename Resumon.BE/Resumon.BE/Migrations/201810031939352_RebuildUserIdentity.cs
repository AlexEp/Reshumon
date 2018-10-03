namespace Resumon.BE.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RebuildUserIdentity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUser", "UserRefID", c => c.Int(nullable: false));
            DropColumn("dbo.AspNetRole", "Discriminator");
            DropColumn("dbo.AspNetUser", "FirstName");
            DropColumn("dbo.AspNetUser", "LastName");
            DropColumn("dbo.AspNetUser", "JoinDate");
            DropColumn("dbo.AspNetUser", "IsUseDiningRoom");
            DropColumn("dbo.AspNetUser", "IsActive");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUser", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUser", "IsUseDiningRoom", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUser", "JoinDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUser", "LastName", c => c.String(nullable: false, maxLength: 100));
            AddColumn("dbo.AspNetUser", "FirstName", c => c.String(nullable: false, maxLength: 100));
            AddColumn("dbo.AspNetRole", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.AspNetUser", "UserRefID");
        }
    }
}
