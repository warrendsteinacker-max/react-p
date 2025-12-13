import { useContext, useState } from "react";


const {data, setData, loading, post: contextPost, del: contextDel} = useContext(DataContext);

export const Data = ({ data, setData, loading, post: contextPost, del: contextDel }) => {

    const [newItem, setNewItem] = useState({ id: '', name: '' });


    


    {        loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <h2>Data</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => contextDel(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )}; 
}