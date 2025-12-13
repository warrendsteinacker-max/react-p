
export const Home = () => {

const {data} = useContext(DataContext);

    return (
        <>
                    {data ? (
                        data.map((item, index) => (
                            <div key={index}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>{item.count}</p>
                                
                                <button onClick={}>increase item count</button>
                                <button onClick={}>decrease item count</button>

                            </div>
                        ))
                    ) : (
                        // Show a loading state while fetching
                        <div>Loading data...</div>
                    )}

<link href="/postdata"> add to storage</link>
<link href="/filterdata"> filter storage</link>
<link href="/deletedata"> delete storage</link>
        </>


);
}