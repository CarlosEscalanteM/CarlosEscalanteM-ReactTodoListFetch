import React, { useState, useEffect } from 'react';


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const createUser = async () => {
        try {
            const response = await fetch(
                "https://playground.4geeks.com/apis/fake/todos/user/CarlosEscalanteM", {
                    method: "POST",
                    body: JSON.stringify([]),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const body = await response.json();
            console.log(body)
            setTasks(body);
        } catch (error) {
            alert(error);
            }
    };
    useEffect(() => {
      const fetchTasks = async () => {
            try {
                const response = await fetch(
                    "https://playground.4geeks.com/apis/fake/todos/user/CarlosEscalanteM"
                );
                const body = await response.json();
                console.log(body)
                setTasks(body);
            } catch (error) {
                alert(error);
                createUser()
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
            await fetch (
                "https://playground.4geeks.com/apis/fake/todos/user/CarlosEscalanteM", {
                    method: "PUT",
                    body: JSON.stringify(updatedTasks),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            alert (error);
        }
    };
    return (
        <div className='text-center'>
            <h1 className="text-center">
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                {task.label}
                            </li>
                        );
                    })}
                </ul>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTaskToApi}>
                    Add a Task
                </button>
            </h1>
        </div>
    );
};
export default Home;