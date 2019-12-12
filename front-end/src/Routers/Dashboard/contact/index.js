import React, { Component } from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import NavBar from '../../../Components/AdminPages/navBar'

class Contact extends Component {

    componentDidMount() {
        console.log("Contact page mounted!")
    }

    render() {
        const title = "hello"
        return (
            <div>
                <CssBaseline />
                <NavBar title={title} />
                <Typography>Hello</Typography>
            </div>
        )
    }
}

export default Contact;