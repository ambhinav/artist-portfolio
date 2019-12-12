import React, { Component } from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../../Components/AdminPages/navBar'

const styles = theme => ({
    root: {
        display: 'flex',
        overflowX: 'auto',
        width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonsLocation: {
        alignSelf: 'flex-end'
    }
});

class Contact extends Component {

    componentDidMount() {
        console.log("Contact page mounted!")
    }

    render() {
        const { classes } = this.props;
        const title = "hello"
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography>Hello</Typography>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Contact);