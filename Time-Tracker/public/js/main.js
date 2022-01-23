var timer_obj;
var todo_tasks =[];


function OnloadFunction() {
    let TodayDate = (new Date()).toISOString().split('T')[0];
    $('#tododate').val(TodayDate);

    timer_obj = new TimeTracker();
    timer_obj.DisplayTasks(TodayDate);

}


function TimerOperations(operation){
    if(operation == 'start' || operation == 'pause'){
        if($('#input').val() == "" || $('#input').val() == null){
            alert("add task")
        }
        else{
        	timer_obj.StartPauseTimer();
        }
    }
    if(operation == "stop"){
        timer_obj.StopTimer();
    }
}


$("#tododate").datepicker({
    dateFormat: 'yy-mm-dd',

    onSelect: function(date) {
        console.log($("#tododate").val())
        timer_obj.DisplayTasks(date);
}
})


class TimeTracker {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.displaySeconds = 0;
        this.displayMinutes = 0;
        this.displayHours = 0;
        this.interval = null;
        this.status = "stopped";
        this.input = '0';
        this.category = 0;        
    }

   
    StartPauseTimer() {
        $('#input').prop( "disabled", true );
        
        this.input = $('#input').val();
        this.category = $('#select option:selected').val();

        if (this.status === "stopped") {

            
            this.interval = window.setInterval(function(){ this.RunTimer();}.bind(this), 1000);
            // $('#startStop').hide();
            $('#stop').show();


            $('#pause').show();
            $('#start').hide();

            this.status = "started";

        }
        else {
            window.clearInterval(this.interval);
            $('#start').show();
            $('#pause').hide();
           
            this.status = "stopped";
        }
    }
    RunTimer(){
        this.seconds++;
        if (this.seconds / 60 === 1) {
            this.seconds = 0;
            this.minutes++;

            if (this.minutes / 60 === 1) {
                this.minutes = 0;
                this.hours++;
            }

        }

        if (this.seconds < 10) {
            this.displaySeconds = "0" + this.seconds.toString();
        }
        else {
            this.displaySeconds = this.seconds;
        }

        if (this.minutes < 10) {
            this.displayMinutes = "0" + this.minutes.toString();
        }
        else {
            this.displayMinutes = this.minutes;
        }

        if (this.hours < 10) {
            this.displayHours = "0" + this.hours.toString();
        }
        else {
            this.displayHours = this.hours;
        }

        $('#starterClock').html(this.displayHours + ":" + this.displayMinutes + ":" + this.displaySeconds);
    
    }

    StopTimer() {
        $('#input').prop( "disabled", false);
        $('#stop').hide();
        $('#pause').hide();
        $('#start').show();

        $('.table').show();
        var table = `<tr>
                        <td class = 'td'>  ` + this.input + `</td>
                        <td class = 'td'> ` + this.category + `</td>' 
                        <td class = 'td'> `+ this.displayHours + `:` + this.displayMinutes + `:` + this.displaySeconds + `</td>
                    </tr>`;
        $('.table tbody').append(table);

        window.clearInterval(this.interval);
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        $('#starterClock').html("00:00:00");
        //$('#startStop').html('start');

        var task_dict={}
        task_dict['date'] = $('#tododate').val();
        task_dict['input'] = this.input;
        task_dict['category'] = this.category;
        task_dict['time'] = this.displayHours + `:` + this.displayMinutes + `:` + this.displaySeconds;
        todo_tasks.push(task_dict);

        console.log(task_dict)

        localStorage.setItem("todo", JSON.stringify(todo_tasks));
        
        task_dict={}

        window.clearInterval(this.interval);
        $('#input').val('');
    }

    DisplayTasks(date){
        var count=0;
        $('#stop').hide();
        $('#pause').hide();
        //localsorage
        if (typeof(Storage) !== "undefined") {
            if (localStorage.todo) {
                console.log("Not first!")
                //get
                let ltasks = JSON.parse(localStorage.getItem("todo"));
                todo_tasks=ltasks.slice();
                console.log(todo_tasks);

                if(todo_tasks.length != 0){

                	$('.table tbody').find("tr:gt(0)").remove();
                    for(let i=0;i<todo_tasks.length;i++){
                        if(todo_tasks[i].date == date){
                            count+=1
                            $(document).ready(function () {
                                var addprevtask;
                                    addprevtask+=`<tr>
                                        <td class = 'td'>`+todo_tasks[i].input+`</td>
                                        <td class = 'td'>`+todo_tasks[i].category+`</td>
                                        <td class = 'td'>`+todo_tasks[i].time+`</td>
                                      <tr>`
                                $("table tbody").append(addprevtask);});
                        }
                    }

                    if(count==0){
                        $('.table').hide();
                        $('#stop').hide();
                        $('#pause').hide();
                    }
                    else{
                        $('.table').show();
                    }
                }
                else{
                    $('.table').hide();
                    $('#stop').hide();
                    $('#pause').hide();
                }
            }
            else
            {
                console.log("firsttime");
                $('.table').hide();
                $('#stop').hide();
                $('#pause').hide();
                
                //set
                localStorage.setItem("todo", JSON.stringify(todo_tasks));

                //get
                let ltasks = JSON.parse(localStorage.getItem("todo"));
                todo_tasks=ltasks.slice()
            }
        }
    }
}