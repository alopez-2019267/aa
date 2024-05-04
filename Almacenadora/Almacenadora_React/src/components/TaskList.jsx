import React, { useState, useEffect } from 'react';
import { Input } from './Input.jsx';
import { ComboBox } from './ComboBox.jsx';

export const TaskList = () => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    startDate: new Date(),
    endDate: new Date(),
    name: '',
  });

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleInputChange = (value, field) => {
    if (field === 'startDate' || field === 'endDate') {
      setNewTask({...newTask, [field]: new Date(value) });
    } else {
      setNewTask({...newTask, [field]: value });
    }
  };

  const handleAddTask = () => {
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      startDate: new Date(),
      endDate: new Date(),
      name: '',
    });
  };

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const handlePriorityFilter = (priority) => {
    if (priority === 'all') {
      setFilteredTasks([...tasks].sort((a, b) => {
        const priorityOrder = ['high', 'medium', 'low'];
        const aIndex = priorityOrder.indexOf(a.priority);
        const bIndex = priorityOrder.indexOf(b.priority);
        return aIndex - bIndex;
      }));
    } else {
      setFilteredTasks(tasks.filter((task) => task.priority === priority).sort((a, b) => {
        const priorityOrder = ['high', 'medium', 'low'];
        const aIndex = priorityOrder.indexOf(a.priority);
        const bIndex = priorityOrder.indexOf(b.priority);
        return aIndex - bIndex;
      }));
    }
  };

  useEffect(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = ['high', 'medium', 'low'];
      const aIndex = priorityOrder.indexOf(a.priority);
      const bIndex = priorityOrder.indexOf(b.priority);
      return aIndex - bIndex;
    });
    setFilteredTasks(sortedTasks);
  }, [tasks]);

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <div className="task-list-form">
        <Input
          field="title"
          label="Title:"
          value={newTask.title}
          onChangeHandler={handleInputChange}
          type="text"
          showErrorMessage={true}
          onBlurHandler={() => { /* handle blur event */ }}
        />
        <Input
          field="description"
          label="Description:"
          value={newTask.description}
          onChangeHandler={handleInputChange}
          type="textarea"
          textarea={true}
          showErrorMessage={true}
          onBlurHandler={() => { /* handle blur event */ }}
        />
        <ComboBox
          field="priority"
          label="Priority:"
          value={newTask.priority}
          onChangeHandler={handleInputChange}
          options={priorityOptions}
        />
        <Input
          field="startDate"
          label="Start Date:"
          value={newTask.startDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          onChangeHandler={handleInputChange}
          type="date"
          showErrorMessage={true}
          onBlurHandler={() => { /* handle blur event */ }}
        />
        <Input
          field="endDate"
          label="EndDate:"
          value={newTask.endDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          onChangeHandler={handleInputChange}
          type="date"
          showErrorMessage={true}
          onBlurHandler={() => { /* handle blur event */ }}
        />
        <Input
          field="name"
          label="Name:"
          value={newTask.name}
          onChangeHandler={handleInputChange}
          type="text"
          showErrorMessage={true}
          onBlurHandler={() => { /* handle blur event */ }}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-list-controls">
        <button onClick={() => handlePriorityFilter('high')}>High</button>
        <button onClick={() => handlePriorityFilter('medium')}>Medium</button>
        <button onClick={() => handlePriorityFilter('low')}>Low</button>
        <button onClick={() => handlePriorityFilter('all')}>All</button>
      </div>
      <div className="task-list-tasks-container">
        <div className="task-list-tasks">
          {filteredTasks.map((task, index) => (
            <div key={index} className={`task-list-task task-list-task--${task.priority}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>
                Start Date: {task.startDate.toLocaleDateString()}, End Date: {task.endDate.toLocaleDateString()}
              </p>
              <p>Name: {task.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskList