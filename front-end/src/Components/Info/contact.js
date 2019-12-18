import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhoneIcon from "@material-ui/icons/PermPhoneMsg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import api from "../../api";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    width: "90%",
    [theme.breakpoints.up(450)]: {
      width: 450
    }
  },
  button: {
    margin: theme.spacing(1)
  }
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "green"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

const StyledGrid = withStyles({
  root: {
    maxWidth: "600px",
    alignItems: "center",
    color: "#E0E0E0"
  }
})(Grid);

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contact: "",
      subject: "",
      message: "",
      email: "",
      snackBar: false,
      feedback: "",
      success: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.handleContactInfo = this.handleContactInfo.bind(this);
    this.setSnackBar = this.setSnackBar.bind(this);
    this.setFeedback = this.setFeedback.bind(this);
  }

  // input validator
  handleContactInfo = props => {
    const { name, subject, message, email } = props;
    if (!this.isValidEmail(email)) {
      this.setFeedback("Oops not a valid email!");
      this.setSnackBar(true);
    } else if (name === "") {
      this.setFeedback("Please enter your name!");
      this.setSnackBar(true);
    } else if (subject === "") {
      this.setFeedback("Please enter a subject!");
      this.setSnackBar(true);
    } else if (message === "") {
      this.setFeedback("Please enter your message");
      this.setSnackBar(true);
    }
  };

  // set the error message
  setFeedback = error => {
    this.setState({
      feedback: error
    });
  };

  setSucess = bool => {
    this.setState({
      success: true
    });
  };

  // toggle the snackbar
  setSnackBar = bool => {
    this.setState({
      snackBar: bool
    });
  };

  //Checks if email looks Valid
  isValidEmail = email => {
    return (
      email.includes("@") &&
      email.includes(".") &&
      email.split("@").length > 1 &&
      email.split("@")[1] !== ""
    );
  };

  handleSubmit = () => {
    const { contact, name, subject, message, email } = this.state;

    const emailData = {
      contact,
      name,
      subject,
      message,
      email
    };

    this.handleContactInfo(emailData);

    api
      .post("/contact", emailData, null)
      .then(res => {
        // give feedback success to user
        this.setState({
          snackBar: true,
          success: true,
          feedback: "Your contact request was sent!",
          name: "",
          contact: "",
          subject: "",
          message: "",
          email: ""
        });
      })
      .catch(err => console.log(err));

    console.log(emailData);
  };

  render() {
    const { classes } = this.props;
    const { snackBar, feedback, success } = this.state;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Grid container justify="center">
              <Typography variant="h3" style={{ color: "#E0E0E0" }}>
                <PhoneIcon />
                &nbsp;Contact
              </Typography>
            </Grid>
            <Grid justify="center" container style={{ paddingTop: 30 }}>
              <Typography variant="h6" style={{ color: "#E0E0E0" }}>
                General enquiries or work
              </Typography>
            </Grid>
            <Grid container justify="center" style={{ paddingTop: 30 }}>
              <StyledGrid item xs={12}>
                <Grid container direction="row" justify="center" spacing={2}>
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
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackBar}
          autoHideDuration={3000}
          onClose={() => this.setSnackBar(false)}
        >
          {success ? (
            <SnackbarContent
              style={{ backgroundColor: "green" }}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar">{feedback}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.setSnackBar(false)}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          ) : (
            <SnackbarContent
              style={{ backgroundColor: "red" }}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar">{feedback}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.setSnackBar(false)}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          )}
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Contact);
