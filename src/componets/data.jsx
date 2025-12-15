import { useContext, useState } from "react";
// 1. You MUST import the context object you want to use!
import { DataContext } from "./DataContext"; 

// 2. Component does NOT take any props, as it uses Context
export const post_page = () => {

    // 3. useContext call is INSIDE the component function
    const { data, contextPost, setData } = useContext(DataContext);


    const [des, setDes] = useState("item description")

    const [name, setName] = useState("item name")

    const [count, setCount] = useState("amount of the item")
    
    const settc = (e) => {
        setCount(e.target.value)
    }

    const settn = (e) => {
        setName(e.target.value)
    }

    const settd = (e) => {
        setDes(e.target.value)
    }

    const makePost = () => {
        const newpost = {
            id: data.leagth + 1,
            name: name,
            description: des,
            count: count
        }
        contextPost(newpost)
    }

    return(
        <>
        <form onSubmit={makePost()}>
            <input type="text" value={name} onChange={settn}/>
            <input type="text" value={count} onChange={settc}/>
            <textarea type="text" value={des} onChange={settd}/>
            <button type="submit">make post</button>
        </form>
        </>

    )



}
