import { useContext, useState } from "react";
// 1. You MUST import the context object you want to use!
import { DataContext } from "./DataContext"; 

// 2. Component does NOT take any props, as it uses Context
export const post_page = () => {

    // 3. useContext call is INSIDE the component function
    const { data, contextPost, setData } = useContext(DataContext);
    



}
