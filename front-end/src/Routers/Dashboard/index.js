import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// import Chart from "react-google-charts";
import NavBar from "../../Components/AdminPages/navBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
// import Modal from "../../components/dashboard/Modal";
// import SuccessToast from "../../components/snackBar/successSnackBar.container";
// import ErrorToast from "../../components/snackBar/errorSnackBar.container";

const styles = theme => ({
  root: {
    display: "flex",
    overflowX: "auto",
    width: "100%"
  },
  //   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
  //   table: {
  //     minWidth: 650
  //   },
  //   tableWrapper: {
  //     marginTop: theme.spacing(3)
  //   }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const title = "Main";
    // const heatMapData = [
    //   [
    //     {
    //       type: "date",
    //       id: "Date"
    //     },
    //     {
    //       type: "number",
    //       id: "Number of Customers"
    //     }
    //   ],
    //   ...heatmap
    // ];
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar title={title} />
        <main className={classes.content}>
          <div>
            <Typography>Hi Jerome, today is {new Date().getDate()}</Typography>
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
