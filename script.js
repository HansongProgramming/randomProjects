const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('myBar');
const perc = document.getElementById('percentage'); 

let completedTasks = 0;
let totalTasks = 0;

function checkEnter(e){
    var keyCode = (e.keyCode? e.keyCode : e.which);
    if (keyCode === 13){

        const taskText = taskInput.value;
        totalTasks++;
        updateProgress();
    
        if (taskText.trim() !== ' ') {
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
