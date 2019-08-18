import React from 'react'
import NavBar from '../../Components/navBar/navbar'
import Work from '../../Components/Work/index'
import Footer from '../../Components/footer';

const App = () => {
    return (
        <div>
            <div className='wrapper'>
                <NavBar />
                <Work />
            </div>
            <Footer />
        </div>
    )
}

export default App