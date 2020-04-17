using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VoiceScheduler.Models;
using VoiceScheduler.Dto;
using System.Data.Entity.Infrastructure;

namespace VoiceScheduler.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
           
            return View();
        }

        
        public ActionResult Login()
        {

            return View();
        }

        public ActionResult Instruction()
        {

            return View();
        }


        [HttpPost]
        public ActionResult CheckUser(Login user)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {

                var item = db.UserLogin.Where(u => u.login == user.login && u.Password == user.Password).FirstOrDefault();
                if (item == null)
                {
                    user.LoginErrorMessage = "Wprowadziłeś plędne hasło i imie użytkownika albo ne posiadasz konta";
                    return View("Login", user);

                }
                else
                {
                    Session["Id"] = user.Id;
                    return RedirectToAction("Index", "Home");

                }


            }



        }
               



        [HttpGet]
        public JsonResult GetEvents()
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                //var events = _context.Event.ToList();
                var events = db.Events.ToList();


                return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }

        }
        


        [HttpPost]
        public JsonResult SaveEvents(Event e)

        {
            var status = false;

            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                if (e.EventID > 0)
                {
                    var v = db.Events.Where(a => a.EventID == e.EventID).FirstOrDefault();
                    if (v != null)
                    {
                        v.Subject = e.Subject;
                        v.Description = e.Description;
                        v.Start = e.Start;
                        v.End = e.End;
                        v.isFullDay = e.isFullDay;
                        v.ThemeColor = e.ThemeColor;
                    }

                  
                }


                else
                {
                    db.Events.Add(e);

                }

               try
                {
                    db.SaveChanges();
                    status = true;
                }

                catch
                {
                     status = false;
                }
             
                  
                
                



            }

              


                return new JsonResult { Data = new { status = status } };

            }

        


        [HttpPost]
        public JsonResult DeleteEvent(int eventID)
        {
            var status = false;
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var v = db.Events.Where(e => e.EventID == eventID).FirstOrDefault();

                if (v != null)
                {
                    db.Events.Remove(v);
                    db.SaveChanges();

                }

                status = true;
                return new JsonResult { Data = new { status = status } };

            }

        }







    }
}
