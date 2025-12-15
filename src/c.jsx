import React, { useContext } from 'react'; // 1. CRITICAL FIX: Add useContext import
import { Link } from 'react-router-dom';
import { DataContext } from './context'; // Assuming this path is correct

export const Home = () => {

    // 2. Consume loading state for proper UX
    // Assuming contextDel is correctly exposed as the delete function
    const { data, contextDel, loading } = useContext(DataContext); 

    // Handle loading state
    if (loading) {
        return <div>Loading items...</div>;
    }
    
    // Handle case where data is loaded but empty
    if (data.length === 0) {
        return (
            <>
                <Link to="/postdata">Add to storage</Link>
                <div>No items found.</div>
            </>
        );
    }

    return (
        <>


            <input />
            {/* Navigation links */}
            <Link to="/postdata">Add to storage</Link>
            {' | '}
            <Link to="/search">Filter storage</Link>
            
            {/* Display the list */}
            {data.map((item) => (
                // 3. FIX: Use item.id for the key prop
                <div key={item.id}> 
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Count: {item.count}</p>
                    
                    {/* Delete button (correctly handles click) */}
                    <button onClick={() => contextDel(item.id)}>
                        Delete {item.name}
                    </button>

                    {/* Add Link to Edit Page (Best Practice) */}
                    <Link to={`/edit/${item.id}`} style={{ marginLeft: '10px' }}>
                        Edit
                    </Link>
                </div>
            ))}
        </>
    );
}