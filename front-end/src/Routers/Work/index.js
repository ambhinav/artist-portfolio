import React from 'react'
import NavBar from '../../Components/navBar/navbar'
import Work from '../../Components/Work/index'
import Footer from '../../Components/footer';

const App = () => {
    return (
        <div id="container">
            <NavBar />
            <div id='content'>
                <Work />
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    )
}

export default App