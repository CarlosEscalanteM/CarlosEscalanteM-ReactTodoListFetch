import React, { useState, useEffect } from 'react';


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    useEffect(() => {
      const fetchTasks = async () => {
            try {
                const response = await fetch(
                    "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha"
                );
                const body = await response.json();
                setTasks(body);
            } catch (error) {
                alert(error);
            }
        };
        fetchTasks();
    }, []); 
    const addTaskToApi = async () => {
        
        const newTaskObject = {
            done: false,
            label: newTask
        };
    const updatedTasks = [...tasks, newTaskObject];
        setTasks(updatedTasks);
    
        try {
            await fetch(
                "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
                    method: "PUT",
                    body: JSON.stringify(updatedTasks),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className='text-center'>
            <h1 className="text-center">
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.label}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTaskToApi}>
                    Add Task
                </button>
            </h1>
        </div>
    );
};
export default Home;