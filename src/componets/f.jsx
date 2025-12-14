import { application } from "express";
import { useEffect } from "react";

export const func = () => {

    useEffect(async() => {
        const response = await fetch(api, {method: 'GET'});
        const data = await response.json();
        console.log(data);
    }, []);

    return (
        (lodeing ? <div>Loading...</div> : data.map((item) => <div key={item.id}>{item.name}</div>))
    );
}


