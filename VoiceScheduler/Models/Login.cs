using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VoiceScheduler.Models
{
    public class Login
    {
        public int Id { get; set; }

        [Required (ErrorMessage="This field is required")]
       
        [Display(Name = "Imię Użytkownika")]
        [DataType(DataType.Text)]
        public string login { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; }
        public string LoginErrorMessage { get; set; }

       
    }
}