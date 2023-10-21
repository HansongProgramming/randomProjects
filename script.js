const taskInput = document.getElementById('taskInput');
        const groupSelect = document.getElementById('groupSelect');
        const addTaskButton = document.getElementById('addTask');
        const taskList = document.getElementById('taskList');

        addTaskButton.addEventListener('click', () => {
            const taskText = taskInput.value;
            const group = groupSelect.value;

            if (taskText.trim() !== '') {
                const task = document.createElement('li');
                task.className = 'task';
                task.innerHTML = `
                    <span>${taskText}</span>
                    <button>Finish</button>
                `;

                // Add event listener to delete task
                task.querySelector('button').addEventListener('click', () => {
                    task.remove();
                });

                taskList.appendChild(task);
                taskInput.value = '';
                groupSelect.value = 'default';
            }
        });