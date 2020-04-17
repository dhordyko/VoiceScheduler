namespace VoiceScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EventChangess : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Events", "EventDateStart", c => c.String());
            AddColumn("dbo.Events", "EventDateEnd", c => c.String());
            DropColumn("dbo.Events", "EventDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "EventDate", c => c.String());
            DropColumn("dbo.Events", "EventDateEnd");
            DropColumn("dbo.Events", "EventDateStart");
        }
    }
}
