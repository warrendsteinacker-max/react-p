import { useState, useEffect } from 'react';
import {BrowserRouter, 
    Routes, 
    Route, 
    Link,
    NavLink} from react-router-dom;
// Remove unused imports like reactLogo, viteLogo, App.css, and { response } from 'express'
import Data from './componets/data.jsx'; 

import logic from './c.jsx';

function App() {
    // 1. STATE DEFINITIONS GO HERE, INSIDE THE COMPONENT
    const [data, setData] = useState(null);
    const [count, setCount] = useState(0); // Keeping this if you need it later

    // 2. Data Fetching useEffect (runs once on mount)
    useEffect(() => {
        // Define an internal async function to handle the Promise chain
        const fetchData = async () => {
            try {
                // 3. Declare the variable using 'const'
                const response = await fetch('http://localhost:3000/api/hello');
                
                // Always check if the response was successful (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                setData(result); // Set the fetched data to state
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Optionally handle error state here
            }
        };

        fetchData(); // Execute the async function
    }, []); // Empty dependency array ensures it only runs once

    return (
        <>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={logic()}></Route>    
            <Route path="/postdata" element={Postdata()}></Route>
            <Route path="/getdata" element={Getdata()}></Route>
            <Route path="/deletedata" element={Deletedata()}></Route>            
            </Routes>
        </BrowserRouter>
        </>
);

}

export default App;