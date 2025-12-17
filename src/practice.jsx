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

JSON.parse(localStorage.setItem(posts))

const fnn = async (id) => {
    try{
    const fdata = data.filter((d) => {return d.id !== id})
    setData(fdata)
    await axios.delete(`api/data/${id}`)
    } catch (error){
        console.error(error.message)
    }
}

const fnnn = async (up2date) => {
    try{
        res = await axios.put(`api/data/${id}`, up2date)
        const newdata = data.map((i) => {if(i.id == up2date){
            return up2date 
        } else {
            return i
        }})
        setData(newdata)
    } finally {
        console.log("n")
    }    
}
const fns 
const fns = async (newdata) => {
    try{
        await axios.put(`api/data/${id}`, newdata) 
        newposts = data.map((i) => { if(i.id === newdata.id){return newdata} else{return i}})
        setData(newposts)
    }
    catch(error) {
console.error(error.message)
    }
}