namespace VoiceScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class message : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Logins", "LoginErrorMessage", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Logins", "LoginErrorMessage");
        }
    }
}
