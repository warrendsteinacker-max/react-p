import { createContext, useEffect, useState } from "react";
import Data from "./componets/data";

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

