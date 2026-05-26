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

export default LoginP

