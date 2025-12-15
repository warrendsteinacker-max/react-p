import { useContext, useState } from "react";
import {useParams} from "react-router-dom"
import { DataContext } from "../context";







export const Editpage_for_post = () => {
    

    const {data, upFunc} = useContext 
    
    const {id} = useParams()

    const post = data.filter((item) => item.id === id)


    return(
    <>  
    
    
    
    <form onSubmit={}>
    <input value={post.name} type="text"/>
    <input value={post.count} type="text"/>
    <input value={post.description} type="text"/>
    <button type="submit">Update Item</button>
    </form>




    </>)

}

