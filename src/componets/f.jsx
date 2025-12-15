import { application } from "express";
import { useEffect } from "react";

export const func = () => {

    useEffect(async() => {
        const response = await fetch(api, {method: 'GET'});
        const data = await response.json();
        console.log(data);
    }, []);

    return (
        (lodeing ? <div>Loading...</div> : data.map((item) => <div key={item.id}>{item.name}</div>))
    );
}











import React, { useState, useEffect } from 'react';

// Assuming url is a prop passed into this component
function MyComponent({ url }) { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Set loading before starting the operation
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await fetch(url);

        // 2. CRITICAL FIX: Manually throw the error if HTTP status is bad
        if (!response.ok) {
          // Use 'response.status' for a helpful message
          throw new Error(`HTTP Error: ${response.status}`); 
        }

        const data = await response.json();
        
        setData(data);
        // 3. Fix: Typo in 'success'
        console.log('success'); 

      } catch (e) {
        // 4. CRITICAL FIX: Only handle the error, DO NOT re-throw!
        console.error("Fetch failed:", e);
        // Fix: Use correct spelling 'message'
        setError(e.message); 

      } finally {
        // 5. Always set loading to false in the finally block
        setLoading(false); 
      }
    }

    fetchData();
    // No cleanup is shown, but a standard addition would be a function 
    // to cancel the fetch if the component unmounts.

  }, [url]); 
  
  // ... rest of the component
}

useEffect(() => {
const fetchd = async () =>{
    try{
    setLoading(true)
    const res = await fetch(url)
        if (!res.ok){
            throw new Error(res.status)
        }

        else {
            const data = await res.json()
            setData(data)
        }

    }
    catch{

        console.error(error.message)

    }
    finally{

        setLoading(false)
    }

}
    fetchd(url)
}, [url])