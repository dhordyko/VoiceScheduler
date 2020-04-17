using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VoiceScheduler.Startup))]
namespace VoiceScheduler
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
