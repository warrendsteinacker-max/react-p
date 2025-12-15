import {Link} from 'react-router-dom'




export const Home = () => {

const {data} = useContext(DataContext);

    return (
        <>
                <link href="/postdata"> add to storage</link>
                <link href="/search"> filter storage</link>
                    {data ? (
                        data.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p>{item.count}</p>
                                
                            <>delete ${item.name}</>
                            </div>
                        ))
                    ) : (
                        // Show a loading state while fetching
                        <div>There are no items</div>
                    )}
        </>


);
}