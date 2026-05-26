import { createContext, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const DataContext = createContext(null)

export const DataProvider = ({children}) => {

    const [user, setU] = useState('')
    const [pass, setP] = useState('')
    const [lode, setL] = useState(false)
    const [E, setE] = useState(false)
    const nav = useNavigate()

    const login = async(e) => {
        e.preventDefault()
        try{
            const d = await axios.post('http://localhost:8000/login', {pass: pass, user: user})
            const res = d.data
            if(res.status === 200){
                setE(false)
                nav('/H')
            }
        }
        catch(error){
            console.error(error.message)
            setE(true)
        }

    }

    return(<DataContext.Provider value={{nav, login, user, setU, lode, setL, pass, setP, E, setE}}>
            {children}
    </DataContext.Provider>)
}


export default DataContext