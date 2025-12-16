// practice 

const p = ({search, setSearch}) => {
const searching = (e) => {
    setSearch(e.target.value)
}
    <input value={search} onChange={(e)=> searching(e)} />
} 


<Home items={items.filter((item) => item.toLowercase().includes(search.toLowercase())}/>

const Home = ({items}) => {
    {items.map((item) => <p>{item.name}</p>)}
}



const fn = (post) => {
    const newdata = [...data, post]
    setPosts(newdata)
    localStorage.setItem(JSON.stringify(newdata))
}