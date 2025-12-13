import { createContext, useEffect, useState } from "react";
import Data from "./componets/data";


async function fetchData() {
    const response = await fetch('http://localhost:3000/api/hello');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
}


DataContext = createContext({
    data: [],
    setData: () => {},
});   


dataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    return ( <DataContext.Provider value={{ data, setData }}>
        {children}
    </DataContext.Provider>);
}

