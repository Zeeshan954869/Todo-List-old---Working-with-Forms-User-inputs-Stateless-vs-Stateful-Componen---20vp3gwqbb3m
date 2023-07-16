import React, { useState } from "react";
import "./../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditedTaskText(taskToEdit.text);
  };

  const handleSaveTask = () => {
    if (editedTaskText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, text: editedTaskText } : task
        )
      );
      setEditTaskId(null);
      setEditedTaskText("");
    }
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskChange = (event) => {
    setEditedTaskText(event.target.value);
  };

  return (
    <div id="main">
      <div>
        <input
          id="task"
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button id="btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="list">
            {editTaskId === task.id ? (
              <div>
                <textarea
                  className="editTask"
                  value={editedTaskText}
                  onChange={handleTaskChange}
                ></textarea>
                <button className="saveTask" onClick={handleSaveTask}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {task.text}
                <button
                  className="edit"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
