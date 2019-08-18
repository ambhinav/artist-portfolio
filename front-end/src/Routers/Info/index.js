import React from 'react'
import NavBar from '../../Components/navBar/navbar'
import Info from '../../Components/Info/about'
import Footer from '../../Components/footer'


const App = () => {
    return (
        <div>
            <div className='wrapper'>
                <NavBar />
                <Info />
            </div>
                <Footer />
        </div>
    )
}

export default App