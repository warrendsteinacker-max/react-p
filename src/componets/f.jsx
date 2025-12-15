import { useContext, useState } from "react";
import {useParams} from "react-router-dom"
import { DataContext } from "../context";







export const Editpage_for_post = () => {
    

    const {data, upFunc} = useContext(DataContext) 
    
    const {id} = useParams()

    const post = data.filter((item) => item.id === id)


    const [postdescript, setDescrip] = useState([post.description])

    const [postcount, setCount] = useState([post.count])

    const [postname, setName] = useState([post.name])

    const [up2date, setNpost] = useState([])

    const f = (e) => {
        setCount(e.target.value)
    }

    const ff = (e) => {
        setName(e.target.value)
    }

    const fff = (e) => {
        setDescrip(e.target.value)
    }

    const up2datefunc = () => {
        setNpost({count: postcount,
            name: postname,
            description: postdescript,
        })

        upFunc(up2date)

    }
    return(
    <>  
    
    
    
    <form onSubmit={up2datefunc}>
    <input value={post.name} onChange={f()} type="text"/>
    <input value={post.count} onChange={ff()} type="text"/>
    <input value={post.description} onChange={fff()} type="text"/>
    <button type="submit">Update Item</button>
    </form>




    </>)

}

