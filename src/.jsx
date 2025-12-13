
import {BrowserRouter, 
    Routes, 
    Route, 
    Link,
    NavLink} from react-router-dom;
// Remove unused imports like reactLogo, viteLogo, App.css, and { response } from 'express' 

import Home from './c.jsx';

function App() {
    // 1. STATE DEFINITIONS GO HERE, INSIDE THE COMPONENT
        return (
        <>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={Home()}></Route>    
            <Route path="/postdata" element={Postdata()}></Route>
            <Route path="/filterdata" element={Getdata()}></Route>
            <Route path="/deletedata" element={Deletedata()}></Route>            
            </Routes>
        </BrowserRouter>
        </>
);

}

export default App;