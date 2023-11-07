const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('myBar');
const perc = document.getElementById('percentage'); 

let completedTasks = 0;
let totalTasks = 0;
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
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = (hh-12) + ":" + mm + ":" + ss + " " + session + "\n" 
     +dede+ " /"+ momo+ " /"+yiyi;
  
    document.getElementById("clock").innerText = time; 
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
    } else {
        progressBar.style.width = '0%';
        perc.innerHTML = "AUGNINA'S PROGRESS: 0%";
    }
}

