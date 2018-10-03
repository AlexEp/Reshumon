namespace Resumon.BE.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIsActiveAndDiningRoomToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUser", "IsUseDiningRoom", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUser", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUser", "IsActive");
            DropColumn("dbo.AspNetUser", "IsUseDiningRoom");
        }
    }
}
