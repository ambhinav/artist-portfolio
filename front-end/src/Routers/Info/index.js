import React from 'react'
import NavBar from '../../Components/navBar/navbar'
import Info from '../../Components/Info/about'
import Footer from '../../Components/footer'


const App = () => {
    return (
        <div id='container'>
            <NavBar />
            <div id='content'>
                <Info />
            </div>
            <div id='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default App