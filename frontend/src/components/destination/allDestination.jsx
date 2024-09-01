import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllDestination() {

    const [destination, setDestination] = useState([]);

    useEffect(() => {
        function getDestination() {
            axios.get("http://localhost:5001/destination/").then((res) => {
                setDestination(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getDestination();
    }, []);

    return (
        <div>
            <h1>All Destination</h1>
        </div>
    )
}