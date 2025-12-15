import e from "express";
import React, { createContext, useEffect, useMemo, useState } from "react";

// --- Configuration ---
const API_BASE_URL = 'http://localhost:3000/api/data'; // Use your actual API base path

// 1. Correct declaration and export of the Context
export const DataContext = createContext({
    data: [],
    setData: () => {},
    loading: true,
    post: [],
    setUptodate: async () => {},
    post: async () => {}, // Use async in the default value
    del: async () => {},
    fil: async () => {},
    putfunc: async () => {},
    search: () => {},
}); 

async function Backendupdate() {
    const response = await fetch(API_BASE_URL, {
        method: 'PUT'
    });
    // Implementation for incrementing count if needed
}

    // Implementation for decrementing count if neede 
// Define the helper functions outside of the Provider component
// This ensures they are not recreated on every render (optimization)

// --- POST Function ---
async function postData(newItem) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Return the server's response
}


// --- DELETE Function ---
async function deleteData(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // No need to return anything if the server sends a 204 No Content
}


// 2. Correct declaration and export of the Provider component
export const DataProvider = ({ children }) => { // ⬅️ PascalCase: DataProvider
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [post, setUptodate] = useState([]);

    // --- Initial GET Fetch (Runs once on mount) ---
    useEffect(() => {
        async function fetchData() {
            try {
                // Assuming the GET endpoint is the same as the base URL
                const response = await fetch(API_BASE_URL); 
                
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const result = await response.json();
                setData(result); 
                
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData(); 
    }, []); 

        const filtercontent = useMemo(() => {
        
        if (!searchData || searchData.trim() === '') {
            return data;
        }

        if (searching) {
           const value = searchData.toLowerCase();
            return data.filter(item => item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value));
        }
        return data;
    }, [data, searchData, searching]);
    
    // --- Context Functions for Components to Call ---
    
    const contextPost = async (newItem) => {
        const result = await postData(newItem);
        // Best Practice: Update local state with the functional form
        setData(prevData => [...prevData, result]); 
    };

    const contextDel = async (id) => {
        await deleteData(id);
        // Best Practice: Update local state by filtering out the deleted item
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const filterD = async (criteria) => {
        await filterData(criteria);
        setData(prevData => prevData.filter(item => item.name === criteria));
    };



    const searchingstart = (e) => {
        newData = e.target.value;
        setSearchData(newData);
        if (newData.trim() === '') {
            setSearching(false);
        }
        else  {
            setSearching(true);
        }
        
        };

        const upFunc = async (post) => {
        const serverrespond = await Backendupdate(post);
        setData(data.map((item) => {

         if(item.id === serverrespond.id) {
            return serverrespond
         } else {
            return item
         }
        
        }
        ))
        };

        //is corrected 

    return ( 
        // 3. Correct Provider Tag and Value
        <DataContext.Provider value={{post, setUptodate, data, setData, loading, post: contextPost, del: contextDel, search: searchingstart, putfunc: upFunc }}>
            {children}
        </DataContext.Provider>
    );
};