var buttons = document.querySelectorAll('input');
var start = buttons[0];
var split = buttons[1];
var reset = buttons[2];
var timer = document.getElementById('timer');
var time = 0;
var timeString ='';
var interval;
var wrapper;
var splitDiv;
var intervalTime = 12;

function msecView(time){
     var view = '00'+time;
     return ':' + view.substr(view.length-3);
}
function timeView(separator,time){
    var view = '0'+(time%60);
    return separator+view.substr(view.length-2);
}
function TimerAdd(){
    time += intervalTime;
    timeString = msecView(time%1000);
    timeString = timeView(':', Math.floor(time/1000))+timeString;
    timeString = timeView(':', Math.floor(time/60000))+timeString;
    timeString = timeView('', Math.floor(time/3600000))+timeString;
    timer.innerHTML = timeString;
}
function createSplitDiv(){
    wrapper = document.getElementsByClassName('wrapper');
    wrapper = wrapper[0];
    splitDiv = wrapper.appendChild(document.createElement('div'));
    splitDiv.classList.add('split_div');
    return splitDiv.appendChild(document.createElement('ol'));
}
function StopClick(){
    if(start.value == 'Stop'){
        var splitList = document.querySelector('ol');
        clearInterval(interval);
        start.value = 'Start';
        splitNum ++;
        var stopElem;
        stopElem = splitList.appendChild(document.createElement('li'));
        stopElem.innerHTML = splitNum+' Stop'+': '+timeString;
    }
    else{
        interval = setInterval(TimerAdd, intervalTime);
        start.value = 'Stop';
    }
}
function SplitClick() {
    var splitList = document.querySelector('ol');
    var splitElem;
    splitNum ++;
    
    if(splitList) {
        splitElem = splitList.appendChild(document.createElement('li'));
        splitElem.innerHTML = splitNum+' Split'+': '+timeString;
    }
}
function  ResetClick(){
    start.value = 'Start';
    timer.innerHTML = '00:00:00:000';
    start.removeEventListener('click', StopClick);
    split.removeEventListener('click', SplitClick);
    start.addEventListener('click', StartClick);
    
    if (start.value != 'Stop'){
        clearInterval(interval);
    }
    if(reset.value == 'Reset'){
        wrapper.removeChild(splitDiv);
    }
}
function StartClick(){
    var splitList = createSplitDiv();
    time = 0;
    splitNum = 0;
    start.value = 'Stop';
    start.removeEventListener('click',StartClick);
    start.addEventListener('click',StopClick);
    reset.addEventListener('click',ResetClick);
    split.addEventListener('click',SplitClick);
    interval = setInterval(TimerAdd,intervalTime);
}

start.addEventListener('click',StartClick);
reset.removeEventListener('click', ResetClick);