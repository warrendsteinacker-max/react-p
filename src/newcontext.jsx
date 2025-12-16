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

        const {id} = useParams()

        try {
            const res = await axios.delete("api/delete", id)
            if (!res.ok) {
                throw new Error(res.status)
            }
        }
        catch(error){
            console.error(error.message)
        }
        const fildata = data.filter((item) => item.id === id)
        setData(fildata) 
    }

    const edit = async (newdata) => {

    }

return(<DataContext.Provider value={{}}>{children}</DataContext.Provider>)
} 
