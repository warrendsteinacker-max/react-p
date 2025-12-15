import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './context'; 

export const Home = () => {

    // Destructure all needed values, including the search state and handler
    const { data, contextDel, loading, searchingstart, searchData } = useContext(DataContext); 

    // --- State Checks ---

    // 1. Loading State: Block all rendering while fetching initial data.
    if (loading) {
        return <div>Loading items...</div>;
    }
    
    // Check if the data is empty and the search bar is empty (meaning nothing was fetched)
    const isInitialEmpty = data.length === 0 && searchData.trim() === '';

    if (isInitialEmpty) {
        return (
            <>
                <Link to="/postdata">Add to storage</Link>
                <div>No items found. Start by adding one!</div>
            </>
        );
    }

    // --- Main Render ---

    // Check if the filtered data is empty but the search bar has text
    const noResultsFound = data.length === 0 && searchData.trim() !== '';

    return (
        <>
            {/* Search Input: Controlled component using context state/handler */}
            <input 
                placeholder='Item Search' 
                onChange={searchingstart} 
                value={searchData}
                style={{ marginBottom: '15px', padding: '10px' }}
            />
            
            {/* Navigation links */}
            <Link to="/postdata">Add to storage</Link>
            {' | '}
            <Link to="/search">Filter storage</Link>
            <hr />

            {/* 2. Show No Results Message */}
            {noResultsFound ? (
                <div>
                    No items match your search for: **"{searchData}"**.
                </div>
            ) : (
                /* 3. Display the List (when data.length > 0 or searchData is empty) */
                data.map((item) => (
                    <div key={item.id}> 
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Count: {item.count}</p>
                        
                        <button onClick={() => contextDel(item.id)}>
                            Delete {item.name}
                        </button>

                        <Link to={`/edit/${item.id}`} style={{ marginLeft: '10px' }}>
                            Edit
                        </Link>
                    </div>
                ))
            )}
        </>
    );
}