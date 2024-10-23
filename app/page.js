"use client"; 

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from './api/taskApi';
import LoadingOverlay from './components/LoadingOverlay';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [taskType, setTaskType] = useState('all'); // 新增状态
  const [loading, setLoading] = useState(false);
  const [total, setListLength] = useState(0);

  useEffect(() => {
    getTaskList(currentPage, taskType);
  }, [currentPage, taskType]);

  const getTaskList = (page, type) => {
    setLoading(true);
    getTasks(page, 10, type).then(response => {
      setTasks(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10));
      setListLength(response.data.total)
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    }).finally(() => {
      setLoading(false);
    });
  };

  const addTask = (task) => {
    setLoading(true);
    createTask(task).then(response => {
      const newTotal = total + 1;
      setListLength(newTotal);

      const newTotalPages = Math.ceil(newTotal / 10);
      setTotalPages(newTotalPages);

      if (currentPage === newTotalPages) {
        getTaskList(currentPage, taskType);
      } else {
        setCurrentPage(newTotalPages);
      }
    }).catch(error => {
      console.error('Error creating task:', error);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleUpdateTask = (id, updatedTask) => {
    setLoading(true);
    updateTask(id, updatedTask).then(response => {
      getTaskList(currentPage, taskType);
    }).catch(error => {
      console.error('Error updating task:', error);
    })
  };

  const handleDeleteTask = (id) => {
    setLoading(true);
    deleteTask(id).then(response => {
      if (response.status === 204) {
        getTaskList(currentPage, taskType);
      }
    }).catch(error => {
      console.error('Error deleting task:', error);
    })
  };

  const handleUpdateTaskStatus = (id, isCompleted) => {
    setLoading(true);
    updateTaskStatus(id, isCompleted).then(() => {
      getTaskList(currentPage, taskType);
    }).catch(error => {
      console.error('Error updating task status:', error);
    })
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <LoadingOverlay loading={loading} />
      <TaskForm onSubmit={addTask} />
      <div className="flex items-center mb-4">
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="all">所有任務</option>
          <option value="completed">已完成任務</option>
          <option value="uncompleted">未完成任務</option>
        </select>
      </div>
      <TaskList 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask} 
        onDeleteTask={handleDeleteTask} 
        onUpdateTaskStatus={handleUpdateTaskStatus} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
