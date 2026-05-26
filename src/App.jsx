import {BrowserRouter, 
    Routes, 
    Route 
    } from 'react-router-dom';
    import { DataProvider } from './context.jsx';

import {useContext} from 'react'

import DataContext from './context'



const LoginP = () => {
    const { login, pass, setP} = useContext(DataContext)
    return(<>
        <form onSubmit={login}>
            <input type="password" value={pass} onChange={(e) => setP(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
        </>)
}



 

function App() {


    return (
        <>
        <BrowserRouter>
        <DataProvider>
        <Routes>
            <Route path='/' element={<LoginP/>}/>
            {/* <Route path='/H' element={}/> */}
        </Routes>
        </DataProvider>
        </BrowserRouter>  
        </>
    );
}

export default App;
