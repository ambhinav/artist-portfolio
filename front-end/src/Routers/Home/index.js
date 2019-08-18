import React from 'react';
// import Background from '../../Components/Home/background'
import Content from '../../Components/Home/content'
import Footer from '../../Components/footer';
import Navbar from '../../Components/navBar/navbar'

const App = () => {

    return (
        <div>
            <div className='wrapper'>
                <Navbar />
                <Content />
            </div>
            <Footer />
        </div>
    )
}

export default App;