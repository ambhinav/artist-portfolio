import React from 'react';
import Typography from '@material-ui/core/Typography'
import { Email } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    root: {
        textAlign: 'right',
        background: '#333333',
        color: 'white',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '10rem'
    },
    list: {
        listStyleType: 'none',
    }
})

const Footer = (props) => {
    const [currentDate] = React.useState(new Date().getFullYear())
    const { classes } = props;

    return (
        <footer className={classes.root}>
            <ul className={classes.list}>
                <li> <Typography variant='h6'><Email /> jerome_tieh@gmail.com</Typography> </li>

                <li> <Typography variant="h6">Jerome Tieh | Illustration and Concept Art &copy; {currentDate}</Typography> </li>
            </ul>
        </footer>
    )
}

export default withStyles(styles)(Footer);