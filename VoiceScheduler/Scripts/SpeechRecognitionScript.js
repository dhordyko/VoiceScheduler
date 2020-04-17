var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
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
    'event': 'tr: first-child',
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
    
    
    //'title': TitleInput,
    //'date': DateInput,
    //'text': TextInput

}

var grammar = '#JSGF V1.0; grammar months; public <month> = ' + months.join(' | ') + ' ;'


var speechRecognitionGrammarList = new SpeechGrammarList();
speechRecognitionGrammarList.addFromString(grammar, 1);
recognition.grammers = speechRecognitionGrammarList;

document.body.onclick = function () {
    recognition.start();

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


    function ModalSave(comm) {

        var el = document.querySelector("td.fc-day.fc-widget-content");
        el.cli
        
    }
