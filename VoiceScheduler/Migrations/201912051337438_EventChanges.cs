namespace VoiceScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EventChanges : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Events", "End", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Events", "End", c => c.DateTime(nullable: false));
        }
    }
}
