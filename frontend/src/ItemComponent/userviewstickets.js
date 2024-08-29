import { useState, useEffect } from 'react';
import {  Table } from 'flowbite-react';
import axios from 'axios';

import './AllTasks.css';
import { Link } from 'react-router-dom';

export default function AllTask() {
  const [tasks, setTasks] = useState([]);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        const data = await axios.get('http://localhost:8020/item');
        console.log(data.data.success);
        if (data.data.success) {
            setTasks(data.data.data);
        }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const res = await fetch(`/api/user/deletetask/${taskIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskIdToDelete)
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  return (
    <div className='task-table-auto'>
      <h2 className="my-8 text-center font-bold text-4xl text-gray-800">All Statues</h2>
    

      {tasks.length > 0 ? (
        <Table hoverable id='task-all-details-table'>
          <Table.Head id="task-all-details-table-head">
            <Table.HeadCell>Ticket ID</Table.HeadCell>
            <Table.HeadCell>Subject</Table.HeadCell>
            <Table.HeadCell> Description</Table.HeadCell>
            <Table.HeadCell>Priority</Table.HeadCell>
            <Table.HeadCell> Date</Table.HeadCell>
            <Table.HeadCell> Solution</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body id="task-details-table-body">
      
            {tasks.map((task) => (
              <Table.Row key={task._id} >
                <Table.Cell>{task.ticketId}</Table.Cell>
                <Table.Cell>{task.subject}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.priority}</Table.Cell>
                <Table.Cell>{task.date}</Table.Cell>
                <Table.Cell>{task.solution}</Table.Cell>
                
                <Table.Cell>
                  <Link to={`/update-task/${task._id}`} id='task-one-details-update-btn'    onClick={() => handleCompleteTask(task._id)}>
                  
                      Solution
                   
                  </Link>
                  <button
                      id="task-one-details-statues-btn"
                      style={{ backgroundColor: task.is_complete ? 'red' : 'yellow' }}
                    >
                   {task.is_complete ? 'Completed' : 'Pending'}
                  </button>
                  
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no tasks yet!</p>
      )}

    </div>
  );
}
