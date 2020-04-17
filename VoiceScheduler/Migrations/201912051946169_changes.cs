namespace VoiceScheduler.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changes : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Events", "End");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "End", c => c.DateTime());
        }
    }
}
