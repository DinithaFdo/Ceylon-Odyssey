import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './itemdetails.css';
import { useReactToPrint } from 'react-to-print';

function AdminItemDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey,setsearchkey]=useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/item');
            console.log(data.data.success);
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

 
    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:8020/item_delete/' + id);
        if (data.data.success) {
            getfetchdata();
            console.log(data.data.message);
            alert('Item  deleted Successfully!');
        }
    };

    
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => {
            setIsGeneratingPDF(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsGeneratingPDF(false);
            alert('Data saved in PDF');
        }
    });
    const handlesearch = (e) => {

        filterdata(searchkey);
    }
    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer && customer.ticketId && customer.ticketId.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    }
    
    return (
        <div className="showitems">
           <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='Ticket Id' className='in'/> <t></t> 
 
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
            <div ref={componentPDF} style={{ width: '100%' }}>
                <h2>Total Tickets</h2> 
                <table>
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Date</th>
                            
                            {!isGeneratingPDF && <th>Action</th>}
                        </tr>
                    </thead>
    
                    <tbody>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.ticketId}</td>
                                <td>{e1.subject}</td>
                                <td>{e1.description}</td>
                                <td>{e1.priority}</td>
                                <td>{e1.date}</td>
                                
                                {!isGeneratingPDF && (
                                    <td>
                                        <a href={`/itemupdate/${e1._id}`}>Edit Details</a>
                                        <button onClick={() => handledelete(e1._id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF}> Report Generate</button>
        </div>
    );
}

export default AdminItemDetails;
