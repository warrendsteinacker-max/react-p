import React, {createContext, useEffect, useState, useMemo} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


export const DataContext = createContext({
    data: [],
    setData: () => {},
    loading: true
})


export const DataProvider = () => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] =usestate(true)
    useEffect(()=> {
        const fetchd = async ()  => {




    }
    }, [url])

    const post = async (newpost) => {
        setData(data => [data, newpost])
        axios.post('api/data', newpost)

    }

    const del = async (id) => {
            const res = await axios.delete(`api/delete/${id}`)
            const fdata = data.filter((i)=> i.id !== id)
            setData(fdata) 
            }


    const edit = async (newdata) => {
        const res = await axios.post(`api/post`, newdata)
        setData(data => [...data, newdata])
        
    }

return(<DataContext.Provider value={{}}>{children}</DataContext.Provider>)
} 
