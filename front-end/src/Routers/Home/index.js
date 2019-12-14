import React from 'react';
// import Background from '../../Components/Home/background'
import Content from '../../Components/Home/content'
import Footer from '../../Components/footer';
import Navbar from '../../Components/navBar/navbar'

const App = () => {

    return (
        <div id="container">
            <Navbar />
            <div id="content">
                <Content />
            </div>
            <div id="footer">
                <Footer />
            </div>
        </div>
    )
}

export default App;