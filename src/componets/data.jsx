import { useContext, useState } from "react";
// 1. You MUST import the context object you want to use!
import { DataContext } from "./DataContext"; 

// 2. Component does NOT take any props, as it uses Context
export const Data = () => {

    // 3. useContext call is INSIDE the component function
    const { data, loading, post: contextPost, del: contextDel } = useContext(DataContext);
    
    const [newItem, setNewItem] = useState({ id: '', name: '' });

    // Handle adding item via contextPost
    const handleAddItem = () => {
        // Simple validation check
        if (!newItem.id || !newItem.name) {
            alert("Please enter both ID and Name.");
            return;
        }
        
        contextPost(newItem); // Call the POST function from context
        setNewItem({ id: '', name: '' }); // Clear the form
    };

    // 4. Correct 'return' structure with a single parent fragment (<>)
    return (
        <>
            {loading ? (
                <div>Loading data from server...</div>
            ) : (
                <div>
                    <h2>Data List</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {/* Check if data exists and is an array before mapping */}
                        {data && data.map(item => (
                            <li key={item.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>ID: {item.id}, Name: {item.name}</span>
                                {/* Call the DELETE function from context */}
                                <button onClick={() => contextDel(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <hr />
            
            <h3>Add New Item</h3>
            {/* Input fields for creating new data */}
            <input
                type="text"
                placeholder="ID"
                value={newItem.id}
                // Use spread operator to update only the 'id' field
                onChange={(e) => setNewItem({...newItem, id: e.target.value})}
            />
            <input
                type="text"
                placeholder="Name"
                value={newItem.name}
                // Use spread operator to update only the 'name' field
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            
            {/* Button calls the handler function */}
            <button onClick={handleAddItem}>Add Item</button>
        </>
    );
};