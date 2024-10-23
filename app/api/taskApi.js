import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://wayi.league-funny.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = (page = 1, limit = 10, type = 'all') => {
  return apiClient.get('/task', {
    params: { page, limit, type },
  });
};

export const createTask = (task) => {
  return apiClient.post('/task', task);
};

export const updateTask = (id, task) => {
  return apiClient.put(`/task/${id}`, task);
};

export const updateTaskStatus = (id, isCompleted) => {
  return apiClient.patch(`/task/${id}`, { is_completed: isCompleted });
};

export const deleteTask = (id) => {
  return apiClient.delete(`/task/${id}`);
};

