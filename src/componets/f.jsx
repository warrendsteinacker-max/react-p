import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context";

export const Editpage_for_post = () => {
    
    // 1. CRITICAL FIX: Pass DataContext to useContext
    const { data, upFunc } = useContext(DataContext); 
    const { id } = useParams();

    // Find the original item. Use find() to get the object and toString() for safety.
    const originalPost = data.find((item) => item.id?.toString() === id);

    // Add a check in case the data hasn't loaded or the ID is invalid
    if (!originalPost) {
        return <div>Loading or Item not found...</div>; 
    }

    // 2. State should be initialized using the originalPost values (without array wrappers)
    // We use useEffect to set the initial state from the fetched data
    const [postdescript, setDescrip] = useState(originalPost.description || '');
    const [postcount, setCount] = useState(originalPost.count || 0); // Use 0 for numbers
    const [postname, setName] = useState(originalPost.name || '');

    // 3. Simple change handlers (correct function reference, e is the event)
    const handleCountChange = (e) => setCount(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleDescripChange = (e) => setDescrip(e.target.value);

    // 4. Update Function (submit handler)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission and page reload

        // Create the NEW object immediately using current state and the ID
        const updatedPost = {
            id: originalPost.id, // CRITICAL: Need to pass the ID back for the update
            count: postcount,
            name: postname,
            description: postdescript,
            // Include any other necessary fields
        };
        
        // Call the global update function
        upFunc(updatedPost);
        
        // Optional: Redirect the user away after a successful update (e.g., to the list page)
        // navigate('/list'); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Editing: {originalPost.name}</h3>
            
            <label>Name</label>
            <input value={postname} onChange={handleNameChange} type="text" />
            
            <label>Count</label>
            <input value={postcount} onChange={handleCountChange} type="number" />
            
            <label>Description</label>
            <input value={postdescript} onChange={handleDescripChange} type="text" />
            
            <button type="submit">Update Item</button>
        </form>
    );
};

