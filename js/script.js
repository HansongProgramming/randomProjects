const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('myBar');
const perc = document.getElementById('percentage'); 
var snd = new Audio("sfx/completeTask.wav");
var fsnd = new Audio("sfx/finished.wav");
let completedTasks = 0;
let totalTasks = 0;
let user = "100011211126922";


function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let dede = date.getDate();
    let momo = date.getMonth() + 1;
    let yiyi = date.getUTCFullYear();
    let session = "AM";
  
      
    if(hh > 12){
        session = "PM";
        hh - 12;
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
     if (hh > 12){
        hh = hh -12;
     }
     let time = (hh) + ":" + mm + ":" + ss + " " + session;  
     let day = dede+ " /"+ momo+ " /"+yiyi;
  
    document.getElementById("clock").innerText = time;
    document.getElementById("date").innerText = day;     
    let t = setTimeout(function(){ currentTime() }, 1000); 
  
  }
  
  currentTime();
  
function checkEnter(e){
    var keyCode = (e.keyCode? e.keyCode : e.which);
    if (keyCode === 13){
        const taskText = taskInput.value;
        updateProgress();
    
        if (taskText.trim() != '') {
            totalTasks++;
            const task = document.createElement('li');
            task.className = 'task';
            task.innerHTML = `
                <span>${taskText}</span>
                <button>✔️</button>
            `;
    
            task.querySelector('button').addEventListener('click', () => {
                task.remove();
                completedTasks++;
                snd.play();
                snd.currentTime=0;
                updateProgress();
            });
    
            taskList.appendChild(task);
            taskInput.value = '';
            groupSelect.value = 'default';
        } else{
            alert("You need to type a task");
        }
    }
}

function updateProgress() {
    if (totalTasks > 0) {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = percentage + '%';
        perc.innerHTML = "AUGNINA'S PROGRESS: " + Math.round(percentage) + '%' ;
        if (percentage == 100){
            if(user != ''){
                alert(user+"has completed all tasks");
            }
            fsnd.play();
            fsnd.currentTime=0;
        }
    } else {
        progressBar.style.width = '0%';
        perc.innerHTML = "AUGNINA'S PROGRESS: 0%";
    }
}

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 900;
canvas.height = window.innerHeight * 0.4;
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false;

function change_color(element) {
  stroke_color = element.style.background;
}

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

window.addEventListener('keydown', function(event){
  if(event.ctrlKey && event.key === 'z'){
    Restore();
  }
  if(event.key === 'e'){
    Clear();
  }
});

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
    }
  }
}

function Clear() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}