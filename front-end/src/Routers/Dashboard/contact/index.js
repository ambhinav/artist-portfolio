import React, { Component } from "react";
import {
  CssBaseline,
  Typography,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavBar from "../../../Components/AdminPages/navBar";
import api from "../../../api";
import { compose } from "recompose";
import { withFirebase } from "../../../Components/Firebase";
import dateFnsFormat from "date-fns/format";

const styles = theme => ({
  root: {
    display: "flex",
    overflowX: "auto",
    width: "100%"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    margin: theme.spacing(1)
  },
  buttonsLocation: {
    alignSelf: "flex-end"
  }
});

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactReqs: null
    };
  }

  componentDidMount() {
    console.log("Contact page mounted!");
    this.props.firebase.getUserToken().then(token => {
      api
        .getAuth("/admin/info/contact", null, token)
        .then(res => {
          console.log(res);
          this.setState({
            contactReqs: res
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    const { classes } = this.props;
    const title = "Contact requests";
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar title={title} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography>Here are your most recent contact requests:</Typography>
          {this.state.contactReqs ? (
            this.state.contactReqs.map((contact, index) => (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Subject: {contact.subject} -{" "}
										{/* {dateFnsFormat(contact.createdAt, "YYYY/MM/DD HH:mm")} */}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid>
                    <Typography>Email: {contact.email}</Typography>
                    <Typography>Name: {contact.name}</Typography>
                    <Typography>Contact: {contact.contact}</Typography>
                    <Typography>Message: {contact.message}</Typography>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          ) : (
            <Typography>Loading...</Typography>
          )}
        </main>
      </div>
    );
  }
}

export default compose(withStyles(styles), withFirebase)(Contact);
