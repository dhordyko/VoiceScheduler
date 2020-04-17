//<script src="https://code.responsivevoice.org/responsivevoice.js?key=tMyDf9L3"></script>

/*================= VARIABLES======================*/
var newEvent;
var newEvent2;
var editEvent;
var HTMLContent;
var noteTextarea = $('#Input1');
var noteTextarea2 = $('#Input2');
var noteTextarea3 = $('#Input3');
var noteContent = [];
var text = "";
/*==================================================*/



/*===============   Shady background for dialog box           ====================*/

$("#contextMenu").before("<div class='dialogBlack'></div>");

/*===============================================================================*/



/*======================   FULLCALENDAR    ===========================*/


$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({

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

                $(".fc-prev-button").text("Previous Week");
                $(".fc-next-button").text("Next Week");

            } else if (view.name === 'agendaDay') {
                var y = moment($('#calendar').fullCalendar('getDate')).day();
                var nextday = moment.weekdays(y + 1);
                var prevday = moment.weekdays(y - 1);
                $(".fc-prev-button").text(prevday);
                $(".fc-next-button").text(nextday);

            }


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
        select: function (startDate, endDate, jsEvent, view) {

            var today = moment();
            var startDate;
            var endDate;

            if (view.name == "month") {
                startDate.set({
                    hours: today.hours(),
                    minute: today.minutes()
                });

                startDate = moment(startDate).format('ddd DD MMM YYYY HH:mm');
                endDate = moment(endDate).subtract('days', 1);
                endDate.set({
                    hours: today.hours() + 1,
                    minute: today.minutes()
                });

                endDate = moment(endDate).format('ddd DD MMM YYYY HH:mm');
            } else {
                startDate = moment(startDate).format('ddd DD MMM YYYY HH:mm');
                endDate = moment(endDate).format('ddd DD MMM YYYY HH:mm');
            }

           

            //newEvent(startDate, endDate);

        },
        validRange: {
            start: '2015-01-01',
            end: '2100-01-01'
        },
        events: '/Home/GetDiaryEvents/',

        locale: 'en-GB',
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
        timeFormat: 'HH:mm',
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




    })
})






    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
    const recognition = new SpeechRecognition();
    recognition.language = 'us-US';
    recognition.lang = 'us-US';
    var grammar = "#JSGF V1.0;";
    var months = ['january', 'february', 'march', 'april', 'mets', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    function range(start, end) {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    var years = range(2000, 2100);
    var controls = {
        'day': '.fc-agendaDay-button',
        'week': ".fc-agendaWeek-button",
        'today': ".fc-today-button",
        'list': ".fc-listWeek-button",
        'month': ".fc-month-button",
        'event': 'DialogBox2',
        'appointment': ".appointment",
        'close': ".close1"
    }

    var functions = {
        'event': dialogMe2,
        'title': TitleInput,
        'date': DateInput,
        'text': TextInput,
        
    }


    var grammar = '#JSGF V1.0; grammar months; public <month> = ' + months.join(' | ') + ' ;'


    var speechRecognitionGrammarList = new SpeechGrammarList();
    speechRecognitionGrammarList.addFromString(grammar, 1);
    recognition.grammers = speechRecognitionGrammarList;
    HTMLContent = ' <button type="button" onclick="CloseAlertBox()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '<ul class="dropdown-menu dropNewEvent" role="menu" aria-labelledby="dropdownMenu" style="display:block;position:static;margin-bottom:5px;">' +
        '<li class="appointment" onclick="newEvent()"> <a tabindex="-1" href="#">Add Appointment</a></li>' +
        '<li onclick=\'newEvent2("' + null + '","' + null + '","' + "Check-in" + '")\'> <a tabindex="-1" href="#">Add Check-In</a></li>' +
        '<li onclick=\'newEvent("' + null + '","' + null + '","' + "Checkout" + '")\'> <a tabindex="-1" href="#">Add Checkout</a></li>' +
        '<li onclick=\'newEvent("' + null + '","' + null + '","' + "Inventory" + '")\'> <a tabindex="-1" href="#">Add Inventory</a></li>' +
        '<li onclick=\'newEvent("' + null + '","' + null + '","' + "Valuation" + '")\'> <a tabindex="-1" href="#">Add Valuation</a></li>' +
        '<li onclick=\'newEvent("' + null + '","' + null + '","' + "Viewing" + '")\'> <a tabindex="-1" href="#">Add Viewing</a></li>' +
        '<li class="divider"></li>' +
        '<li><a tabindex="-1" href="#">Close</a></li>' +
        '</ul>';

    /*=========================================================*/

    document.body.onclick = function () {
        recognition.start();

    };
    
    


    recognition.onend = function () {
       

        recognition.start();
       
    }


    var Elements=function Elements(comm) {
        for (i in controls)
            if (comm.toLowerCase() === i)
                $(controls[i]).click();
        /*
        else if (comm.toLowerCase() === 'event') {
             dialogMe2();
         } else if (comm.toLowerCase() === 'title') {
             TitleInput();
         } else if (comm.toLowerCase() === 'clear') {
             TextInput(comm)
         }
         */
    }

    var Functions = function Functions(comm) {
        for (i in functions)
            if (comm.toLowerCase() === i)
                $(functions[i]);
         
    }

    
 
     
    

    /*=================== RECOGNITION EVENT=====================*/
    
    var Main_Recognition = recognition.addEventListener('result', function(event) { 
       
        console.log(event)
        var last = event.results.length - 1;
        var command = event.results[last][0].transcript;
        console.log(command)
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

        Elements(command);
        Functions(command);
    })

    function TitleInput() {
        console.log("text")
        if ($(".modal-content").css("display", "block")){

            recognition.onresult = function (event) {

                var current = event.resultIndex;
                var command = event.results[current][0].transcript;
                if (command === 'date') {
                    Functions(command)
                }
               else if (command === 'close'){
                   Elements(command)
                   Main_Recognition();
                }
                else {
                    noteTextarea.val(command);
                }
                     
               

            }
        }
    };
    
               
   function DateInput()  {

        recognition.onresult = function (event) {
            var current = event.resultIndex;
            var command = event.results[current][0].transcript;
            if (command === 'title') {
                Functions(command)
            }

            else if (command === 'close') {
                Elements(command);
                Main_Recognition();

            }
            else if (command === 'text') {
                Functions(command)

            }
                

            else {

                noteTextarea2.val(command);

            }
        }
   }

   function TextInput() {
      
       recognition.continuous = false;
       recognition.onresult = function (event) {
           var current = event.resultIndex;
           var command = event.results[current][0].transcript;
           if (command === 'title') {
               Functions(command)
           }

           else if (command === 'close') {
               Elements(command);
           }


           else {
              
               text += command;
               noteTextarea3.val(text);
              
               
           }
    
       }
      
   }
        
    
    function newEvent() {

        $("body").css("overflow", "hidden");
        $(".modal-content-td").css("opacity", "0");
        $(".modal-content-td").css("top", "0%");
        $('input#title').val("");

        dialogMe();
    };

    function dialogMe() {

        $(".modal-content").css("height", "550px");
        $(".modal-content").css("width", "500px");

        $(".modal-content").css("display", "block");
        $(".dialogBlack").css("opacity", "0.5");
        $(".dialogBlack").css("z-index", "250");

        $(".close").css("opacity", "1");

        $(".modal-content").children().css("opacity", "1")
        $(".modal-content").css("padding", "15px");
        $(".modal-content").css("margin-left", "-300.5px");
        $(".modal-content").css("margin-top", "-150.5px");
        $(".modal-content").css("height", "300px");

        setTimeout(function () {
            $(".modal-content").css("top", "50%");
            $(".modal-content").css("opacity", "1");
        }, 400);

    };
    function CloseAlertBox() {

        $(".close1").click(function () {
            $(".modal-content, .modal-content-td ").children().css("opacity", "0");
            $(".dialogBlack").css("opacity", "0");
            $(".dialogBlack").css("z-index", "-5");
            $(".close").css("opacity", "0");
            $(".modal-content, .modal-content-td").css("height", "0px");
            $(".modal-content, .modal-content-td").css("width", "0px");
            $(".modal-content, .modal-content-td").css("margin-left", "174.5px");
            $(".modal-content, .modal-content-td").css("padding", "0px");
            setTimeout(function () {
                $(".modal-content, .modal-content-td").css("opacity", "0");
                $("body").css("overflow", "visible");
            }, 400);
        })
    };




  function dialogMe2() {
        document.querySelector(".modal-content-td").innerHTML = (HTMLContent);
        $(".modal-content-td").css("top", "0%");
        $(".modal-content-td").css("left", "50%");

        $(".modal-content-td").css("height", "550px");
        $(".modal-content-td").css("width", "500px");

        $(".modal-content-td").css("display", "block");
        $(".dialogBlack").css("opacity", "0.5");
        $(".dialogBlack").css("z-index", "250");

        $(".modal-content-td .close").css("opacity", "1");

        $(".modal-content-td").children().css("opacity", "1")
        $(".modal-content-td").css("padding", "15px");
        $(".modal-content-td").css("margin-left", "-300.5px");
        $(".modal-content-td").css("margin-top", "-150.5px");
        $(".modal-content-td").css("height", "300px");

        setTimeout(function () {
            $(".modal-content-td").css("top", "50%");
            $(".modal-content-td").css("opacity", "1");
        }, 400);
    }