import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateTask.css';

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    ticketId: "",
        subject: "",
        description: "",
        priority: "",
        date: "",
    status: "",
    solution: "",
  });

  useEffect(() => {
    const fetchTaskData = async () => {
        try {
            const response = await fetch(`http://localhost:8020/item_order/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setTask(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [id]);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      task.is_complete=true;
      const response = await fetch(`http://localhost:8020/item_update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: task._id,
          ...task,
          status: 'completed', // Update task status to completed
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Task Completed Successfully');
        navigate('/AllTask'); // Redirect back to AllTask after update
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
 
  return (
    <div className='task-update-form'>
      <h1 id="task-main-topic-of-form">Solution </h1>

      <label htmlFor="stafffid">Ticket ID:</label>
      <input type="text" id="ticketId" name="ticketId" onChange={handleInputChange} value={task?.ticketId} readOnly />

      <label htmlFor="task_name">Subject:</label>
      <input type="text" id="subject" name="subject" onChange={handleInputChange} value={task?.subject} readOnly />

      <label htmlFor="task_description">Description:</label>
      <input type="text" id="description" name="description" onChange={handleInputChange} value={task?.description} readOnly />

      <label htmlFor="task_description">solution:</label>
      <input type="text" id="solution" name="solution" onChange={handleInputChange} value={task?.solution}  />

     

      <button className='update-btn' onClick={handleUpdate} >Complete</button>
    </div>
  );
}

export default UpdateTask;
