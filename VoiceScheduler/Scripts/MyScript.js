
                   $(document).ready(function () {
                       
                       var events = [];
                       var selectedEvent = null;
                       RefreshCalendar();
                       var txtSubject = $('#txtSubject');
                       var txtStart = $('#txtStart');
                       var txtFrom = $('#txtFrom');
                       var txtTill = $('#txtTill');
                       var txtEnd = $('#txtEnd');
                       var txtLocation = $('#address');
                       var chkFullDay = $("#chkbox");
                       var txtDescription = $('#txtDescription');
                       var chkStatus = $('#isChecked');
                       var noteContent = '';
                       var UserName = $('#userid');
                       var Password = $('#password');
                       var ViewDisplay = null;

                       //Login window
                                                 
                       $('#Login').modal({
                           backdrop: 'static',
                           keyboard: false
                       })
                           
                       
                     
                          
                       
                      
                             
                       /*=====REFRESH CLAENDAR FUNCTION=====================*/

          

         function RefreshCalendar() {
                
                           var events = [];
                           var google_events = [];
                           console.log(events)
                           $.ajax({
                               type: "GET",

                               url: "/home/GetEvents",


                               success: function (data) {

                                   $.each(data, function (i, v) {


                                       events.push({

                                           eventID: v.EventID,
                                           title: v.Subject,
                                           description: v.Description,
                                           start: moment(v.Start),
                                           location: v.Location,
                                           startDate: v.EventDateStart,
                                           endDate: v.EventDateEnd,
                                           end: v.End != null? moment(v.End) : null,
                                           color: v.ThemeColor,
                                           allDay: v.isFullDay

                                       });
                                      

                                   })


                                  
                                   GenerateCallendar(events);
                                  


                               
                                   
                                   //var view = $('#calendar').fullCalendar('getView');
                                   //if (view.name === 'agendaWeek') {
                                   //    console.log(view)
                                   //}
                                   
                                  

                                   

                               },

                               error: function (error) {
                                   alert('faild234');
                               }

                           })


                       }

         


                       /*============= GENERATE CALENDAR FUNCTION=====================*/
                       function GenerateCallendar(events) {

                       $('#calendar').fullCalendar('destroy');
                      
                      
                           $('#calendar').fullCalendar({

                               defaultDate: new Date(),
                               lang: 'pl',
                               locale: 'pl',
                            timezone: "local",
                            nextDayThreshold: "09:00:00",
                            allDaySlot: true,
                            displayEventTime: true,
                            displayEventEnd: true,
                            firstDay: 1,
                            weekNumbers: false,
                            selectable: true,
                            weekNumberCalculation: "ISO",
                            eventLimit: true,
                            eventLimitClick: 'week', //popover
                            navLinks: true,
                            defaultTimedEventDuration: '01:00:00',
                            editable: true,
                            minTime: '07:00:00',
                            maxTime: '18:00:00',
                            slotLabelFormat: 'HH:mm',
                            weekends: true,
                            nowIndicator: true,
                            dayPopoverFormat: 'dddd DD/MM',
                            longPressDelay: 0,
                            eventLongPressDelay: 0,
                            selectLongPressDelay: 0,
                               height:450,
                            


                               timeFormat: 'h(:mm)a',

                               header: {
                                   left: 'today, prevYear,prev,next,nextYear',
                                   center: 'title',
                                   right: 'month,agendaWeek,agendaDay,listWeek'
                               },
                               buttonText: {
                                   prevYear: new moment().year() - 1,
                                   nextYear: new moment().year() + 1,

                               },
                               viewRender: function (view) {
                                   var y = moment($('#calendar').fullCalendar('getDate')).year();
                                   $(".fc-prevYear-button").text(y - 1);
                                   $(".fc-nextYear-button").text(y + 1);
                                   var y = moment($('#calendar').fullCalendar('getDate')).month();
                                   var nextmonth = moment.months(y + 1);
                                   var prevmonth = moment.months(y - 1);
                                   if (view.name === 'month') {

                                       $(".fc-prev-button").text(prevmonth);
                                       $(".fc-next-button").text(nextmonth);

                                   } else if (view.name === 'agendaWeek') {

                                       $(".fc-prev-button").text("Poprzedni Tydzień");
                                       $(".fc-next-button").text("Następny  Tydzień");

                                   } else if (view.name === 'agendaDay') {
                                       var y = moment($('#calendar').fullCalendar('getDate')).day();
                                       var nextday = moment.weekdays(y + 1);
                                       var prevday = moment.weekdays(y - 1);
                                       $(".fc-prev-button").text(prevday);
                                       $(".fc-next-button").text(nextday);

                                   }

                                   return view.name
                               },
                               views: {
                                   month: {
                                       columnFormat: 'dddd'
                                   },
                                   agendaWeek: {
                                       columnFormat: 'dddd D/M',
                                       eventLimit: false
                                   },
                                   agendaDay: {
                                       columnFormat: 'dddd',
                                       eventLimit: false
                                   },
                                   listWeek: {
                                       columnFormat: ''
                                   }
                               },
                               eventLimit: true,
                               eventColor: '#FF0000',
                               events: events,
                               eventClick: function (calEvent, jsEvent, view) {
                                   selectedEvent = calEvent,
                                   console.log(selectedEvent)
                                   $('#myModal #eventTitle').text('          '+ calEvent.title.toUpperCase());
                                   if (calEvent.allDay == true) {
                                       $('#myModal #allDayTitle').text('          Caly Dzień'.toUpperCase());
                                   }
                                   if (calEvent.color == 'czerwony') {
                                       $('#EventHeader').attr("style", "background-color:red")
                                   }
                                   else if (calEvent.color == 'niebieski') {
                                       $('#EventHeader').attr("style", "background-color:blue")
                                   }
                                   else if (calEvent.color == 'zielony') {
                                       $('#EventHeader').attr("style", "background-color:green")
                                   }
                                   
                                  
                                   var $discription = $('<div/>');
                                   $discription.append($('<p/>').html('<b>Początek: </b>' + calEvent.startDate));
                                   if (calEvent.end != null) {
                                       $discription.append($('<p/>').html('<b>Koniec: </b>' + calEvent.endDate));

                                   }
                                   $discription.append($('<p/>').html('<b>Lokacja: </b>' + calEvent.location));
                                  
                                   $discription.append($('<p/>').html('<b>Opis: </b>' + calEvent.description));
                                   
                                  
                                   $('#myModal #pDetails').empty().html($discription);

                                   $('#myModal').modal('show');


                               },
                               validRange: {
                                   start: '2015-01-01',
                                   end: '2100-01-01'
                               },
                               selectable: true,
                               select: function (start,end) {
                                   selectedEvent = {
                                       eventID: 0,
                                       title:'',
                                       description:'',
                                       start:start,
                                       end:end,
                                       color:'',                                     
                                       allDay: false
                                
                                   }
                                   openAddEditForm();
                                                               
                                   $('#calendar').fullCalendar('unselect');
                               }

                           })
                       }

                       
                       /*============= *BTN EDIT FUNCTION=====================*/
                       $('#btnEdit').click(function () {
                           openAddEditForm();
                            

                       })
                       
                       /*============= #BTN DELETE FUNCTION=====================*/
                       $('#btnDelete').click(function () {

                           $.ajax({
                               type: "POST",
                               url: '/home/DeleteEvent',
                               data: { 'eventID': selectedEvent.eventID },
                               success: function (data) {
                                   if (data.status) {
                                       RefreshCalendar();
                                       $('#myModal').modal('hide');

                                   }

                               },
                               error: function (error) {
                                   alert('Failed');
                               }

                           });

                       })


                      

                     
                       /*============= openAddEditForm FUNCTION=====================*/


                       function openAddEditForm() {
                        
                           if (selectedEvent != null) {
                               $('#hdEventId').val(selectedEvent.eventID);
                               $('#txtSubject').val(selectedEvent.title);
                               $('#txtEnd').val('');
                               $('#txtStart').val('');
                               //$('#isChecked').prop("checked", selectedEvent.allDay || false);
                               //$('#isChecked').change();
                               
                               $('#txtDescription').val(selectedEvent.description);
                               $('#ddThemeColor').val(selectedEvent.color);
                                
                           }
                           $('#myModal').modal('hide');
                           $('#myModalSave').modal();
                          
                       }
                           
                       

                       /*============= #BTN SAVE FUNCTION=====================*/

                      

                       $('#myModalSave #btnSave').click(function () {


                           txtDescription.removeClass('flash-marker');


                           if ($('#txtSubject').val().trim() === "") {
                               $('#txtSubject').addClass('flash-marker');
                               
                               $('#txtSubject').attr('placeholder', '\uf25a Nie zaznaczyłeś/aś DZIEŃ wydarżenia! Rozpocznij od nowa');
                               return
                           }

                           if ($('#txtStart').val().trim() === "") {
                               $('#txtStart').addClass('flash-marker');

                               $('#txtStart').attr('placeholder', '\uf25a Nie zaznaczyłeś/aś DATĘ wydarżenia! Rozpocznij od nowa');
                               return
                           }
                           if ($('#isChecked').is(':checked') === false && $('#txtEnd').val().trim()==="") {
                               $('#txtEnd').addClass('flash-marker');

                               $('#txtEnd').attr('placeholder', '\uf25a Nie zaznaczyłeś/aś DATĘ wydarżenia! Rozpocznij od nowa');
                               return
                           }

                           

                               if ($('#txtStart').val() > $('#txtEnd').val()) {
                                   alert("Zaznaczyłeś/aś nieprawidłową datę")
                               

                           }
                           
                           
                           var data = {
                              
                               EventID: $('#hdEventId').val(),
                               Subject: $('#txtSubject').val().trim(),
                               Start:$('#txtStart').val(),
                               Description: $('#txtDescription').val(),
                               Location: $('#address').val(),
                               EventDateStart: $('#txtStart').val(),
                               EventDateEnd: $('#txtEnd').val(),
                               End: $('#txtEnd').val(),
                               ThemeColor: $('#ddThemeColor').val(),
                               isFullDay: $('#isChecked').is(':checked')

                           };
                          
                          
                           Save(data)

                       })


                       /*============= CHECKER FUNCTION=====================*/

                       function Save(data) {

                                    
                           $.ajax({
                               type: "POST",
                               url: '/home/SaveEvents',
                               data: data,
                               success: function (data) {

                                   if (data.status) {
                                       RefreshCalendar();
                                       $('#myModalSave').modal('hide');

                                   }
                                   else {
                                       alert('Failed');
                                   }
                               },
                               error: function (error) {
                                   alert('Failed');
                               }

                           });










                       }
                            
                       /*============= SAVE FUNCTION=====================*/
                      
                   
                   

                                /*============= SPEECH RECOGNITION FUNCTION=====================*/

                   var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
                   var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
                   var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
                   
                     
                   const recognition = new SpeechRecognition();
                  
                   recognition.language = 'pl-PL';
                   recognition.lang = 'pl';
                   var grammar = "#JSGF V1.0;";
                   var months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'my', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
                   var daysWeek = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];

                   
                   
                   function range(start, end) {
                       var ans = [];
                       for (let i = start; i <= end; i++) {
                           ans.push(i);
                       }
                       return ans;
                   }

                   var years = range(2000, 2100);
                   var controls = {
                      
                       'dzień': '.fc-agendaDay-button',
                       'tydzień': ".fc-agendaWeek-button",
                       'dzisiaj': ".fc-today-button",
                       'lista': ".fc-listWeek-button",
                       'miesiąc': ".fc-month-button",
                       'zapisz': "#btnSave",
                       'plan dnia': '.fc-listWeek-button',
                       'następny': '.fc-next-button',
                       'następnej': '.fc-next-button',
                       'poprzedni': '.fc-prev-button',
                       'zaloguj': '#LoginUser',
                       'edytuj': '#btnEdit',
                       'usuń': '#btnDelete',
                      

                      
                       
                   }
                   var functions = {
                       'stop':Stop,
                       'wydarzenie': ModalSave,
                       'wydarzenia': ModalSave,
                       'zamknij': ModalSaveClose,
                       'tytuł': TitleInput,
                       'w górę': ScrollingUp,
                       'w dół': ScrollingDown,
                       'logowanie': Login,
                       'instrukcja': ModalInstruction,
                       
                      
                   }

                  


                                  
                   document.body.onclick = function () {
                       if (noteContent.length) {
                           noteContent += ' ';
                       }
                       recognition.start();
                       $('#Login .modal-header').popover('show');
                       $('#speechCheck').css('display', 'block');
                   };

                   recognition.onend = function () {
                       recognition.start();
                     
                     

                   }

                  

                   var Elements = function Elements(comm) {
                       for (i in controls)
                           if (comm.toLowerCase() === i)
                               $(controls[i]).click();
                   }

                   var Functions = function Functions(comm) {
                       for (i in functions)
                           if (comm.toLowerCase() === i)
                               $(functions[i]);
                          

                   }

                  
                  

                   /*=================== RECOGNITION EVENT=====================*/

                   var Main_Recognition = recognition.addEventListener('result', function (event) {
                       
                       
                       var last = event.results.length - 1;
                       var command = event.results[last][0].transcript;
                    
                       if (months.includes(command.toLowerCase())) {
                           var index = months.indexOf(command.toLowerCase());

                           var month = $("#calendar").fullCalendar('getDate').month(index);
                           newDate = moment(month);
                           $("#calendar").fullCalendar('gotoDate', newDate);

                       }

                       if (years.includes(parseInt(command.toLowerCase()))) {
                           var year = $("#calendar").fullCalendar('getDate').year(command.toLowerCase());
                           newDate = moment(year);
                           $("#calendar").fullCalendar('gotoDate', newDate);
                       }

                       if (daysWeek.includes(command.toLowerCase())) {
                           var day = $("#calendar").fullCalendar('getDate').day(command.toLowerCase());
                           newDate = moment(day);
                           $("#calendar").fullCalendar('gotoDate', newDate);
                          
                          
                       }
                      
                       Elements(command);
                       Functions(command);
                       console.log(command)
                       var event_title = $('.fc-title').text();
                      
                       if (event_title.toLowerCase().indexOf(command) >= 0) {
                           console.log("ok")
                           $(".fc-day-grid-event").click()
                       }


                      
                   })

                 



                   function formatDate(date) {
                      
                       var marker = "";
                      

                       var split_arr = date.split(" ");
                       console.log(split_arr)
                       for (i in split_arr) {
                           if (split_arr[i] == "pm") {
                               marker = "PM"
                           }
                           else if (split_arr[i] == "am") {
                               marker = "AM"
                           }

                       }
                       var year = $('#calendar').fullCalendar('getDate').year();
                       var month = $('#calendar').fullCalendar('getDate').month()+1;
                       var pattern = year + "-" + month + "-" + split_arr[0] + " " + split_arr[2] + ":00" + " " + marker

                       
                       var mydate = new Date(pattern);
                       
                       
                       return moment(mydate).lang("en").format("DD-MMM-YYYY HH:mm a");


                   }

                   function ScrollingDown() {
                       console.log('Tekst')

                       $("html, body").animate({ scrollTop: "650px" }, 600);
                       $("#Instruction").animate({ scrollTop: "1050px" }, 600);

                       $(".fc-scroller").animate({ scrollTop: "350px" }, 600);

                   }
                  function ScrollingUp() {

                      $("html, body").animate({ scrollTop: "0px" }, 600);
                      $(".fc-scroller").animate({ scrollTop: "0px" }, 600);
                      $("#Instruction").animate({ scrollTop: "0px" }, 600)

                  }
                
                 

                 
                  function Login() {
                      UserName.attr('placeholder', '\uf130 Podaj imie użytkownika ');
                      $(".modal-content").addClass('flash-marker');

                      recognition.onresult = function (event) {
                          var current = event.resultIndex;
                          var command = event.results[current][0].transcript;
                          if (command === 'imię') {
                              UserName.addClass('flash-marker');
                              command = '';
                              Login_UserName();

                          }

                      }
                  }
                  function Login_UserName() {
                      var Name = null;
                      recognition.onresult = function (event) {
                          var current = event.resultIndex;
                          var command = event.results[current][0].transcript;
                          if (command === 'hasło') {
                              command = Name;
                              UserName.removeClass('flash-marker');
                            Password.attr('placeholder', '\uf130 Podaj hasło użytkownika ');
                            Password.addClass('flash-marker');
                            Login_Password();

                          }

                          UserName.val(command);
                          Name = command;

                      }
                  }

                  function Login_Password() {
                      var password = null;
                      recognition.onresult = function (event) {
                          var current = event.resultIndex;
                          var command = event.results[current][0].transcript;
                          if (command === 'zaloguj' || command === 'zarejestruj')
                          {
                              command=password
                          }
                          Password.val(command);
                          password = command
                          $('#LoginUser').popover('show');
                      }
                  }
                    
                  function ModalInstruction(){

                      $('#Instruction').modal('show');


                  }


                   function ModalSave() {

                       var year = $('#calendar').fullCalendar('getDate').year();
                       var month = $('#calendar').fullCalendar('getDate').month();
                      
                       $('#calendar').fullCalendar('select', year + '-' + month + '-' + '01');

                   }
                   
                   function ModalSaveClose() {

                       $('#myModalSave').modal('hide');
                       $('#Instruction').modal('hide');
                       $('#myModal').modal('hide');
                       TitleInput();

                   }
                   function Stop() {
                       recognition.onend = function () {
                           recognition.stop();
                       }
                       recognition.stop();
                       TitleInput();

                   }


                  
                  

                   function TitleInput() {
                       txtSubject.attr('placeholder', "\uf130 Podaj tytuł wydarzenia");
                       txtSubject.addClass('flash-marker');
                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;
                           if (command === 'początek') {
                               txtSubject.removeClass('flash-marker');
                               command = '';
                               DateStart();

                           }

                           else {

                               txtSubject.val(command);

                           }





                       };

                   }

                 
                   
                   function DateStart() {
                       txtStart.attr('placeholder', '\uf130 Podaj datę i czas początku wydarzenia w formacie :"10 Marca 10:30"');
                       txtStart.addClass('flash-marker');

                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;
                           if (command === 'koniec') {
                               txtStart.removeClass('flash-marker');
                               command = '';
                               EndTime();

                           }

                           else {

                               txtStart.val(formatDate(command));
                               if (txtStart.val() === 'Invalid date') {
                                   $('#start_date').popover('show');
                               }
                              
                               

                           }

                       };


                   }

              
                       







                   function EndTime() {
                       txtEnd.attr('placeholder', '\uf130 Podaj datę i czas zakończenia wydarzenia w formacie :"10 Marca 10:30"');
                       txtEnd.addClass('flash-marker');

                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;
                          
                           if (command === 'lokacja') {
                               txtEnd.removeClass('flash-marker');
                               command = '';
                               Location();

                           }
                           else if (!txtEnd.val(formatDate(command)==="Invalid date")){
                               txtEnd.attr('readonly',true);
                           }
                           else {
                               txtEnd.val(formatDate(command));
                               if (txtEnd.val() === 'Invalid date') {
                                   $('#end_date').popover('show');
                               }
                               
                               
                           }

                           
                       };


                   }
                   function Location() {
                       txtLocation.addClass('flash-marker');
                       var txt_message = '\uf130 Say Check/Uncheck command to insert/remove chkmark'
                       txtLocation.append(txt_message);                                        
                       console.log(recognition)
                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;

                           if (command === 'cały dzień') {
                               
                               txtLocation.removeClass('flash-marker');
                               command = '';
                               FullDayOpt();

                           }
                          
                           else {
                               txtLocation.val(command);


                           }


                       };


                   }
                                    

                   function FullDayOpt() {
                       chkFullDay.addClass('flash-marker');
                       var txt_message = '\uf130 Powiedz "zaznać"/"odrzuć" zeby dodać albo usunąć znaczek'
                       chkFullDay.append(txt_message);
                       //$('#isChecked').attr('checked', true)
                       
                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                          
                           var command = event.results[current][0].transcript;
                           if (command === 'zaznać' || command === 'zaznacz') {
                               $('#isChecked').attr('checked', true);
                               $('#isChecked').attr('value', true);
                               $('#myModalSave').find('#txtEnd').attr("disabled", true);
                               $('#myModalSave').find('#txtEnd').val("");
                           } 
                           else if (command === 'odrzuć' || command === 'Odrzuć') {
                               $('#isChecked').attr('checked', false)
                               $('#isChecked').attr('value', false);
                               $('#myModalSave').find('#txtEnd').attr("disabled", false);
                           
                           }
                           else if (command === 'kolor') {
                               chkFullDay.removeClass('flash-marker');
                               Color()

                           }
                           else {
                               null;
                           }
                          

                       };


                   }

                   function Color() {
                       $('#color_mark').popover('show');
                       $('#ddThemeColor').addClass('flash-marker');

                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;
                           if (command === 'notatka') {
                               $('#ddThemeColor').removeClass('flash-marker');
                               Description();                                 
                           }
                           else {
                              
                               $('#ddThemeColor').val(command); 
                               $('#ddThemeColor')[0].focus(); 
                               $('#seddThemeColorl1').trigger('change'); 
                           }

                       };


                   }

                   function Description() {
                       txtDescription.addClass('flash-marker');
                       
                       recognition.onresult = function (event) {
                           var current = event.resultIndex;
                           var command = event.results[current][0].transcript;
                           
                           for (var i = current; i < event.results.length; ++i) {
                               if (command === 'zapisz') {
                                   
                                   recognition.continuous = false;
                                   noteContent = '';
                                
                                  
                               }
                               else if (command === 'wyczyść') {
                                   noteContent = "";
                                   txtDescription.val(noteContent);

                               }
                               else {
                                   recognition.continuous = true;
                                   noteContent +=' ' + command
                                   txtDescription.val(noteContent);
                                   recognition.continuous = false;
                               }
                               
                           }
                       };


                   }
                  
                  


                   })