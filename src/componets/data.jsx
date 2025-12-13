import React, { useState } from 'react'; // ⬅️ Correct Import

export default function Data({data, setData}) {
    
    // 1. STATE DEFINITION MUST BE HERE, before return()
    const [ele1, setEle1] = useState('');
    const [ele2, setEle2] = useState('');
    const [ele3, setEle3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // 2. Create a new data object that matches the expected structure
        const newItem = {
            id: Date.now(), // Create a unique key
            title: ele1,
            description: `Element 2: ${ele2}, Element 3: ${ele3}` 
            // You can structure this object however your 'data' array needs it
        };

        // 3. Update the data array by ADDING the new item, not replacing everything
        setData(prevData => [...prevData, newItem]);

        // 4. Clear the individual input fields after submission
        setEle1('');
        setEle2('');
        setEle3('');
    };
    
    return (
        <>
            <div>data from url</div>
            
            {/* Displaying existing data */}
            {data.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                </div>
            ))}
            
            {/* The form handles the submission */}
            <form onSubmit={handleSubmit}> 

                {/* Input 1: Uses setEle1 in the onChange handler */}
                <input 
                    type="text" 
                    placeholder='ele 1' 
                    value={ele1} // Value is controlled by state
                    onChange={(e) => setEle1(e.target.value)} 
                />

                {/* Input 2 */}
                <input 
                    type="text" 
                    placeholder='ele 2' 
                    value={ele2}
                    onChange={(e) => setEle2(e.target.value)} 
                />

                {/* Input 3 */}
                <input 
                    type="text" 
                    placeholder='ele 3' 
                    value={ele3}
                    onChange={(e) => setEle3(e.target.value)} 
                />

                {/* The button's type="submit" will trigger the form's onSubmit */}
                <button type="submit">Change data</button>

            </form>    
        </>
    );
}