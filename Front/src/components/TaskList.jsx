import React, { useState, useEffect } from 'react';
import { Input } from './Input.jsx';
import { ComboBox } from './ComboBox.jsx';
import coffeandcode from '../img/coffeandcode.png'

export const TaskList = () => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'SELECT',
    startDate: new Date(),
    endDate: new Date(),
    name: '',
  });

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (value, field) => {
    if (field === 'startDate' || field === 'endDate') {
      // Convertir la fecha a formato UTC
      const utcDate = new Date(value);
      // Obtener la diferencia entre la fecha actual y UTC
      const timezoneOffset = utcDate.getTimezoneOffset();
      // Aplicar la diferencia para obtener la fecha en UTC
      const adjustedDate = new Date(utcDate.getTime() + timezoneOffset * 60 * 1000);
      setNewTask({...newTask, [field]: adjustedDate });
    } else {
      setNewTask({...newTask, [field]: value });
    }
  };

  const handleAddTask = () => {
    if (newTask.status === 'SELECT') {
      setShowError(true); // Show error message if "Select..." is selected
      return;
    }
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    setNewTask({
      title: '',
      description: '',
      status: '',
      startDate: new Date(),
      endDate: new Date(),
      name: '',
    });
  };

  const statusOptions = [
    { value: 'SELECT', label: 'Select...', isDisabled: true },
    { value: 'DOING', label: 'Doing' },
    { value: 'DONE', label: 'Done' },
    { value: 'TO-DO', label: 'To-Do' },
  ];

  const handleStatusFilter = (status) => {
    if (status === 'all') {
      setFilteredTasks([...tasks].sort((a, b) => {
        const statusOrder = ['DOING', 'DONE', 'TO-DO'];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);
        return aIndex - bIndex;
      }));
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status).sort((a, b) => {
        const statusOrder = ['DOING', 'DONE', 'TO-DO'];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);
        return aIndex - bIndex;
      }));
    }
  };

  useEffect(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const statusOrder = ['DOING', 'DONE', 'TO-DO'];
      const aIndex = statusOrder.indexOf(a.status);
      const bIndex = statusOrder.indexOf(b.status);
      return aIndex - bIndex;
    });
    setFilteredTasks(sortedTasks);
  }, [tasks]);

  return (
    <div className="task-list">
      <div className="task-container">
      <img src={coffeandcode} className="logo"/>
        <div className='task-container-list'>
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
              field="status"
              label="Status:"
              value={newTask.status}
              onChangeHandler={handleInputChange}
              options={statusOptions}
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
            <button onClick={() => handleStatusFilter('DOING')}>Doing</button>
            <button onClick={() => handleStatusFilter('DONE')}>Done</button>
            <button onClick={() => handleStatusFilter('TO-DO')}>To-Do</button>
            <button onClick={() => handleStatusFilter('all')}>All</button>
          </div>
        </div>
        <div className="task-list-tasks-container"> 
          <div className="task-list-tasks">
            {filteredTasks.map((task, index) => (
              <div key={index} className={`task-list-task task-list-task--${task.status}`}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>
                Start Date: {new Date(task.startDate).toLocaleDateString()}, End Date: {new Date(task.endDate).toLocaleDateString()}
                </p>
                <p>Name: {task.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList;
