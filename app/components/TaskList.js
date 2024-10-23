import { useState } from 'react';

const TaskList = ({ tasks, onUpdateTask, onUpdateTaskStatus, onDeleteTask, currentPage, totalPages, onPageChange }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedName(task.name);
    setEditedDescription(task.description);
  };

  const saveEdits = (id) => {
    onUpdateTask(id, { name: editedName, description: editedDescription });
    setEditingTaskId(null);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-2 border border-gray-300 rounded">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mr-2 border border-gray-300 rounded p-1"
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="mr-2 border border-gray-300 rounded p-1"
                />
                <button onClick={() => saveEdits(task.id)} className="my-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Save
                </button>
                <button onClick={() => setEditingTaskId(null)} className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => onUpdateTaskStatus(task.id, !task.is_completed)}
                  className="mr-2"
                />
                {task.name} - {task.description} {task.is_completed && '(已完成)'}
                <button onClick={() => startEditing(task)} className="ml-4 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => onDeleteTask(task.id)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  刪除
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
