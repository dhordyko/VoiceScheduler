namespace VoiceScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EventChanges1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Events", "Location", c => c.String());
            AddColumn("dbo.Events", "EventDate", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Events", "EventDate");
            DropColumn("dbo.Events", "Location");
        }
    }
}
