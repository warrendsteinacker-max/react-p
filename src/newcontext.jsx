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


export const App = () => {
    
}