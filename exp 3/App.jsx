import { useState } from "react";
import { useEffect } from "react";
const Api=()=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response)=>{
                    if (!response.ok) {
                        throw new error('error')
                    }
                    return response.json()
                })
                .then((data)=>{
                    setData(data)
                    setLoading(false)
                    console.log(data)
                })
                .catch((error)=>{
                    setError(error)
                    setLoading(true)
                 })
        },[])
    


    return(
        <>
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data.length > 0 && (
                <ul>
                    {data.slice(0, 5).map((post) => (
                        <li key={post.id}>
                            <strong>{post.title}</strong>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
            
        </>
    )
}
export default Api