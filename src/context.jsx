import React, { createContext, useEffect, useMemo, useState } from "react";

// --- Configuration ---
const API_BASE_URL = 'http://localhost:3000/api/data';

// (Add Backendupdate, postData, deleteData definitions here or import them)
// CRITICAL FIX: Ensure Backendupdate is defined to accept 'post' and send data.
// Assuming Backendupdate is now defined as above. 

// 1. Correct declaration and export of the Context
export const DataContext = createContext({
    // Simplified default value for clarity
    data: [],
    loading: true,
    searchData: '',
    createItem: async () => {},
    deleteItem: async () => {},
    updateItem: async () => {},
    handleSearchInput: () => {},
}); 

// 2. Correct declaration and export of the Provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // CRITICAL FIX: Add missing state for searching/filtering
    const [searchData, setSearchdata] = useState(''); // Holds the text typed by the user
    const [searching, setSearching] = useState(false); // Tracks if the user is actively filtering
    // Removed unused state: [post, setUptodate]

    // --- Initial GET Fetch (Correct) ---
    useEffect(() => { 
        // ... fetchData logic ...
    }, []); 

    // --- Filter Logic (Correct) ---
    const filteredContent = useMemo(() => {
        // ... filtering logic using searchData, data, and searching state ...
        if (searchData.trim() === '') {
            return data;
        }
        // Simplified filter:
        const value = searchData.toLowerCase();
        return data.filter(item => 
            item.name?.toLowerCase().includes(value) || 
            item.description?.toLowerCase().includes(value)
        );
    }, [data, searchData]); // Removed 'searching' from dependencies as searchData change is sufficient

    // --- Context Functions for Components to Call ---
    
    // POST (contextPost) is correct, renamed to createItem for clarity
    const createItem = async (newItem) => {
        const result = await postData(newItem);
        setData(prevData => [...prevData, result]); 
    };

    // DELETE (contextDel) is correct, renamed to deleteItem for clarity
    const deleteItem = async (id) => {
        await deleteData(id);
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    // CRITICAL FIX: Search Handler (renamed from searchingstart, fixed scope issues)
    const handleSearchInput = (e) => {
        const newData = e.target.value; // FIX: Declared with const
        setSearchdata(newData);
        setSearching(newData.trim() !== '');
    };

    // PUT/PATCH (upFunc) is correct, renamed to updateItem
    const updateItem = async (post) => {
        const serverrespond = await Backendupdate(post);
        // CRITICAL FIX: Use functional state update to prevent stale data
        setData(prevData => prevData.map((item) => {
            if(item.id === serverrespond.id) {
                return serverrespond;
            } else {
                return item;
            }
        }));
    };

    // --- Context Value (CRITICAL FIX: Unify naming and expose filtered data) ---
    return ( 
        <DataContext.Provider value={{
            data: filteredContent, // Expose filtered data to components
            loading,
            searchData, // Expose search term
            createItem,
            deleteItem,
            updateItem,
            handleSearchInput, // Expose the handler
            // Add other shared state/functions here
        }}>
            {children}
        </DataContext.Provider>
    );
};