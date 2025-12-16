import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';


export const DataContext = createContext({
    data: [],
    setData: () => {},
    loading: true,
    p: async() => {},
    e: async() => {},
    d: async() => {},
})


export const DataProvider = ({children}) => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Request
            const response = await axios.get(`api/data`);

            const data = response.data;

            // 4. Update state
            setData(data);

        } catch (error) {
            // Catches network errors or the error manually thrown above
            console.error("Data fetching failed:", error.message);
            // You might want to display the error to the user
            
        } finally {
            // Runs after try or catch block
            setLoading(false);
        }
    };

    fetchData();

    }, []);
    

    const edit = async (newdata) => {
            const res = await axios.put(`api/data/${newdata.id}`, newdata)
            const Ndata = data.map(item => { if(item.id === newdata.id){ return newdata} else{ return item}})
            setData(Ndata) 
    }

    const del = async (id) => {
            const res = await axios.delete(`api/delete/${id}`)
            const fdata = data.filter((i)=> i.id !== id)
            setData(fdata) 
            }


    const post = async (newpost) => {
        const res = await axios.post(`api/post`, newpost)
        setData(data => [...data, newpost])
        
    }

return(<DataContext.Provider value={{setData, data, loading, e: edit, d: del, p: post}}>{children}</DataContext.Provider>)
}









import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import { DataProvider } from './context';
import {Home} from './vontext'
import {Edit} from './dontext'
import {Post} from './fontext'


export const App = () => {
   return(<>
    
    <DataProvider>
        <BrowserRouter>
        <Link to="/post">Go to post page</Link>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/edit/:id" element={<Edit/>}/>
                <Route path="/post" element={<Post/>}/>
            </Routes>
        </BrowserRouter>
    </DataProvider>
    
    </>)
}


setData, data, loading, e: edit, d: del, p: post



import { useContext, useState} from 'react';
import { DataContext } from 

export const Home = () => {
    const {data, loading, del} = useContext(DataContext)
    
    return (<>
    {loading ? <p>loading...</p> : data.map((item) => <div><h5>item.name</h5><h1>item.count</h1><p1>item.des</p1><button onClick={() => del(item.id)}>Delete</button></div>)}
    <Link to="edit/:item.id">Edit post</Link>
    </>)
}




setData, data, loading, e: edit, d: del, p: post

import React, { useContext, useState } from 'react';
// Assuming DataContext is imported from the correct file
import { DataContext } from './path/to/DataContext'; 
import { useNavigate } from 'react-router-dom'; 


export const PostPage = () => {
    // FIX 1: Use the Context object (DataContext), not the Provider component
    const { p: post } = useContext(DataContext); 
    
    // Using descriptive names for state
    const [namee, setNamee] = useState("");
    const [countt, setCountt] = useState("");
    const [dess, setDess] = useState("");
    
    // Optional: Use useNavigate to redirect the user after a successful post
    const navigate = useNavigate(); 

    // Helper function definitions are fine, but can be simplified:
    const handleChangeName = (e) => setNamee(e.target.value);
    const handleChangeCount = (e) => setCountt(e.target.value);
    const handleChangeDes = (e) => setDess(e.target.value);

    // FIX 5: Accept the event (e) and call preventDefault
    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        // FIX 3: Remove local ID calculation. Server handles ID.
        let newp = {
            name: namee, 
            des: dess, 
            count: countt 
        };
        
        // Call the context function
        post(newp)
            .then(() => {
                // Clear the form and redirect after successful post
                setNamee('');
                setCountt('');
                setDess('');
                navigate('/'); // Redirect to the Home page
            })
            .catch((error) => {
                // Handle the error (e.g., show an alert)
                console.error("Post failed, please try again.");
            });
    };

    return (
        // FIX 4: Pass the function reference (handleSubmit) directly
        <form onSubmit={handleSubmit}> 
            <label>Name:
                {/* FIX 4: Pass the function reference directly */}
                <input type='text' value={namee} onChange={handleChangeName}/> 
            </label>
            <br/>
            <label>Count:
                <input type='text' value={countt} onChange={handleChangeCount}/>
            </label>
            <br/>
            <label>Description:
                <input type='text' value={dess} onChange={handleChangeDes}/>
            </label>
            <br/>
            <button type="submit">Create Post</button>
        </form>
    );
};




setData, data, loading, e: edit, d: del, p: post

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// IMPORTANT: You need access to the full data array here
import { DataContext } from './path/to/DataContext'; 


export const Edit_page = () => {
    // Access edit function and the full data array from context
    const { e: edit, data } = useContext(DataContext); 
    
    // Get the item ID from the URL
    const { id } = useParams();
    
    // State variables (renamed for clarity and consistency)
    const [name, setName] = useState("");
    const [count, setCount] = useState("");
    const [des, setDes] = useState("");
    
    const navigate = useNavigate();

    // **********************************************
    // 1. CRITICAL LOGIC: Load existing data on mount
    // **********************************************
    useEffect(() => {
        // Find the item in the global data array using the URL parameter (id)
        // Ensure the IDs match type (use toString() or check if they are already strings)
        const currentItem = data.find(item => item.id.toString() === id);

        if (currentItem) {
            // Pre-fill the state with the existing item's values
            setName(currentItem.name || '');
            setCount(currentItem.count || '');
            setDes(currentItem.des || '');
        } else if (data.length > 0) {
            // If data is loaded but item not found, redirect (e.g., item deleted)
            navigate('/');
        }
    }, [id, data, navigate]); // Re-run if ID or data changes

    // Helper functions (FIXED: simplified and correct state setters)
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeCount = (e) => setCount(e.target.value);
    const handleChangeDes = (e) => setDes(e.target.value);

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const updatedItem = {
            // Ensure the ID sent to the server is the one from the URL
            id: id, 
            name: name, 
            des: des, 
            count: count 
        };
        
        edit(updatedItem)
            .then(() => {
                // Navigate back to the home page after successful edit
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Edit failed:", error);
                // In a real app, display an error message here.
            });
    };

    return (
        <form onSubmit={handleSubmit}> 
            <h2>Edit Item {id}</h2>
            
            <label>Name:
                {/* Inputs now use the correctly named state variables */}
                <input type='text' value={name} onChange={handleChangeName}/> 
            </label>
            <br/>
            <label>Count:
                <input type='text' value={count} onChange={handleChangeCount}/>
            </label>
            <br/>
            <label>Description:
                <input type='text' value={des} onChange={handleChangeDes}/>
            </label>
            <br/>
            <button type="submit">Save Changes</button>
        </form>
    );
};

