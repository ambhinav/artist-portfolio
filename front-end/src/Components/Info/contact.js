import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/PermPhoneMsg';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import PropTypes from "prop-types";
// import SuccessToast from '../../components/snackBar/successSnackBar.container';
// import ErrorToast from '../../components/snackBar/errorSnackBar.container';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        width: '90%',
        [theme.breakpoints.up(450)]: {
            width: 450,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
});

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const StyledGrid = withStyles({
    root: {
        maxWidth: '600px',
        alignItems: 'center',
        color: '#E0E0E0'
    }
})(Grid)

class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            contact: '',
            subject: '',
            message: '',
            email: '',
            mailSent: false,
            snackBar: false,
            errorMsg: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.isValidEmail = this.isValidEmail.bind(this)
        this.handleContactInfo = this.handleContactInfo.bind(this)
        this.setSnackBar = this.setSnackBar.bind(this)
        this.setError = this.setError.bind(this)
    }

    // input validator
    handleContactInfo = (props) => {
        const { name, subject, message, email } = props
        if (!this.isValidEmail(email)) {
            this.setError('Oops not a valid email!')
            this.setSnackBar(true)
        } else if (name === '') {
            this.setError('Please enter your name!')
            this.setSnackBar(true)
        } else if (subject === '') {
            this.setError('Please enter a subject!')
            this.setSnackBar(true)
        } else if (message === '') {
            this.setError('Please enter your message')
            this.setSnackBar(true)
        }


    }

    // set the error message
    setError = (error) => {
        this.setState({
            errorMsg: error
        })
    }

    // toggle the snackbar
    setSnackBar = (bool) => {
        this.setState({
            snackBar: bool
        })
    }

    //Checks if email looks Valid
    isValidEmail = (email) => {
        return email.includes("@") && email.includes('.') && email.split('@').length > 1 && email.split('@')[1] !== "";
    };

    handleSubmit = () => {
        // send a mail from jerome's email
        // node mailer?
        const {
            contact,
            name,
            subject,
            message,
            email,
        } = this.state

        const emailData = {
            contact,
            name,
            subject,
            message,
            email
        }

        this.handleContactInfo(emailData)

        console.log(emailData);
    }

    render() {
        const { classes } = this.props;
        const { snackBar, errorMsg } = this.state;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container justify='center' direction='column' alignItems='center'>
                        <Grid container justify='center'>
                            <Typography variant='h3' style={{color: '#E0E0E0'}}>
                                <PhoneIcon />&nbsp;Contact
                            </Typography>
                        </Grid>
                        <Grid justify="center" container style={{ paddingTop: 30 }}>
                            <Typography variant="h6" style={{color: '#E0E0E0'}}>
                                General enquiries or work
                            </Typography>
                        </Grid>
                        <Grid container justify='center' style={{ paddingTop: 30 }}>
                            <StyledGrid item xs={12}>
                                <Grid container direction='row' justify='center' spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CssTextField
                                            required
                                            label="Name"
                                            fullWidth
                                            autoComplete="name"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <CssTextField
                                            label="Phone number"
                                            fullWidth
                                            autoComplete="Phone"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.contact}
                                            onChange={e => this.setState({ contact: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>

                                <CssTextField
                                    required
                                    label="Email"
                                    fullWidth
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />

                                <Typography variant="h6" style={{ paddingTop: 20 }}>
                                    Your message:
                                    </Typography>

                                <CssTextField
                                    required
                                    label="Subject"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.subject}
                                    onChange={e => this.setState({ subject: e.target.value })}
                                />

                                <CssTextField
                                    required
                                    label="Message"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows="7"
                                    value={this.state.message}
                                    onChange={e => this.setState({ message: e.target.value })}
                                />

                                <Grid container justify="center" style={{ paddingTop: 20 }}>
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                        </Button>
                                </Grid>
                            </StyledGrid>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={snackBar}
                    autoHideDuration={3000}
                    onClose={() => this.setSnackBar(false)}
                >
                    <SnackbarContent
                        style={
                            { backgroundColor: 'red' }
                        }
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" >
                                {errorMsg}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setSnackBar(false)}>
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Contact);

