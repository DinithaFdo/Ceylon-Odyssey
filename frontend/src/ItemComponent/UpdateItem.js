import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './itemupdate.css'

function UpdateItem(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({

      ticketId: "",
        subject: "",
        description: "",
        priority: "",
        date: "",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8020/item_order/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8020/item_update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
          
           alert("Item updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };

   
    return(
        <div className='item-update'>

<h2> Update Form</h2>

<label>Ticket ID:</label>
    <input type="text" id="ticketId" name="ticketId"  onChange={handleInputChange} value={updateorder?.ticketId }/><br></br>
  
    <label>Subject:</label>
    <input type="text" id="subject" name="subject"  onChange={handleInputChange} value={updateorder?.subject }/><br></br>
    <label>Description:</label>
    <input type="text" id="description" name="description" onChange={handleInputChange} value={updateorder?.description }/><br></br> 
    <label>Priority :</label>
    <input type="text" id="priority" name="priority"  onChange={handleInputChange} value={updateorder?.priority }/><br></br> 
    <label>Date:</label>
    <input type="date" id="date" name="date"  onChange={handleInputChange} value={updateorder?.date }/><br></br> 
  
    
    <button onClick={handleUpdate} >Update Details</button><br></br> <br></br> 
   
   <br></br>
    
        </div>
    )
}
export default UpdateItem;