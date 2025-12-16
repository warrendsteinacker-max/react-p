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


export const DataProvider = () => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] =usestate(true)
    useEffect(()=> {
        const fetchd = async ()  => {
            try{
                response = await axios.get(`api/data`)
                if (!response.ok) {
                    throw new Error(response.status)
                setData()
                }
            }




    }
    }, [url])

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
