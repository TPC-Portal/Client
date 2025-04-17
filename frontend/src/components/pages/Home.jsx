import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div>
                <h1>Welcome to TPC Portal</h1>
            </div>
            <Link to="/data" className=' hover:underline '>
                Go to Data Page
            </Link>
        
        </>

    )
}

export default Home