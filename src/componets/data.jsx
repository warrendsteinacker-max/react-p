import React, { useContext, useState } from "react";
// Import the component used to get context
import { DataContext } from "./DataContext"; 
// Import a navigation hook if you want to redirect after submission
// import { useNavigate } from "react-router-dom"; 

// Use PascalCase for component names (PostPage)
export const PostPage = () => {

    // Consume the context values needed
    const { contextPost } = useContext(DataContext); 
    // const navigate = useNavigate(); // For optional redirection

    // Initialize state with empty strings for a blank form
    const [des, setDes] = useState(""); 
    const [name, setName] = useState(""); 
    const [count, setCount] = useState(""); 
    
    // Use consistent, descriptive names for handlers
    const handleCountChange = (e) => setCount(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleDesChange = (e) => setDes(e.target.value);

    // --- Submission Handler (CRITICAL FIX) ---
    const handleSubmit = (e) => {
        e.preventDefault(); // 1. CRITICAL: Prevent default page reload

        const newpost = {
            // 2. CRITICAL FIX: REMOVE client-side ID generation
            name: name,
            description: des,
            count: Number(count) // Convert count to a number before sending
        };
        
        // Call the context function to send the data
        contextPost(newpost);
        
        // Optional: Clear form inputs after submission
        setName('');
        setDes('');
        setCount('');
        
        // Optional: Redirect the user
        // navigate('/'); 
    };

    return(
        <>
            <h1>Create New Item</h1>
            {/* 3. CRITICAL FIX: Pass the function reference to onSubmit */}
            <form onSubmit={handleSubmit}> 
                <input type="text" placeholder="Item name" value={name} onChange={handleNameChange}/>
                <input type="number" placeholder="Amount of the item" value={count} onChange={handleCountChange}/>
                <textarea placeholder="Item description" value={des} onChange={handleDesChange}/>
                
                <button type="submit">Make Post</button>
            </form>
        </>
    );
}