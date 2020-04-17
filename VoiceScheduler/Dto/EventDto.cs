using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VoiceScheduler.Dto
{
    public class EventDto
    {
        
        public int? EventID { get; set; }
        public string Sunject { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string ThemeColor { get; set; }
        public bool isFullDay { get; set; }
        public int Key { get; set; }
    }
}