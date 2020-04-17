using System;
using System.Collections.Generic;

using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace VoiceScheduler.Models
{
    public class Event
    {
 
        public int? EventID { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get;  set; }
        public string Location { get; set; }
        public string EventDateStart { get; set; }
        public string EventDateEnd { get; set; }
        public string ThemeColor { get; set; }
        public bool isFullDay { get; set; }
       
    }
}