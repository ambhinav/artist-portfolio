import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import NavBar from "../../../Components/AdminPages/navBar";
import DragAndDrop from "../../../Components/AdminPages/utils/dropzone";
import api from "../../../api";
import { withFirebase } from "../../../Components/Firebase";
import { compose } from 'recompose';

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

class DashboardWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      title: "",
      category: "",
			imgUrl: "",
			files: [],
			feedback: null
    };
    this.deleteEntry = this.deleteEntry.bind(this);
    // this.resetEntries = this.resetEntries.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.watchImgUrl = this.watchImgUrl.bind(this);
    this.watchTitle = this.watchTitle.bind(this);
    this.watchCategory = this.watchCategory.bind(this);
		this.submit = this.submit.bind(this);
		this.handleOnDrop = this.handleOnDrop.bind(this)
		this.retrieveImageUrl = this.retrieveImageUrl.bind(this)
  }

  componentDidMount() {
    console.log("Work mounted!");
  }

  deleteEntry(event) {
    const id = event.currentTarget.value;
  }

  // resetEntries () {
  //     resetEntries();
  // }

  newEntry() {
    const { imgUrl, title, category } = this.state;
    const payload = {
      imgUrl,
      title,
      category,
      edit: true
    };
    this.setState({
      imgUrl: "",
      title: "",
      category: "",
    });
  }

  watchImgUrl(event) {
    this.setState({
      imgUrl: event.target.value
    });
  }

  watchTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  watchCategory(event) {
    this.setState({
      category: event.target.value
    });
  }

  handleOnDrop(files) {
		const fileToUpload = files[0]
		this.setState({
			files: fileToUpload
		})
		this.props.firebase
			.uploadFileToStorage("/Test/" + fileToUpload.name, fileToUpload)
			.then((uploadTask) => {
				uploadTask.task
				.then({'onFullfilled': this.retrieveImageUrl(fileToUpload)})
				.catch(err => {
					console.log(err)
				})
			})
			.then(() => {
				this.setState({
					feedback: "File uploaded successfully!"	
				}) 
			})
			.catch(err => console.log(err, "Error uploading file to storage!"));
	}
	
	retrieveImageUrl(file) {
		this.props.firebase
			.getImageUrl("/Test/" + file.name)
			.then(url => {
				console.log(url)
				this.setState({
					imgUrl: url
				})
			}).catch(err => console.log(err, "Error obtaining image url"));
	}

	submit() {
		const { title, category, imgUrl } = this.state;

		const payload = {
			imgUrl,
      title,
			category,
      edit: true
		};

		this.props.firebase
      .getUserToken()
      .then(token => {
				// make api call to upload to worksByCategory
				console.log(payload)
        api
          .post("/admin/work/putartwork", payload, token)
          .then(res => { 
						console.log(res)
						this.setState({
							imgUrl: '',
      				title: '',
							category: '',
							feedback: 'Artwork uploaded!'
						})
					})
          .catch(err => {
            console.log(err, "error");
          });
      })
			.catch(err => console.log(err, "Error"));

		// upload file to storage
		
    
	}

  render() {
    const { classes } = this.props;
    const { imgUrl, title, category, feedback } = this.state;
    const navTitle = "Work";
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar title={navTitle} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
            Add new pictures to {navTitle}
          </Typography>
          <TextField
            multiline={true}
            variant="outlined"
            fullWidth
            value={category}
            placeholder="Eg. Character designs"
            label="Category of art work"
            className={classes.button}
            onChange={this.watchCategory}
          />
          <TextField
            multiline={true}
            variant="outlined"
            fullWidth
            value={title}
            placeholder="Nioh drawing"
            label="Title of art work"
            className={classes.button}
            onChange={this.watchTitle}
          />
          <DragAndDrop handleOnDrop={this.handleOnDrop} />
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
						{ feedback ?
							<Typography variant="h6" align="inherit" style={{ paddingRight: 20 }}>
								{ feedback }
							</Typography>
							: null
						}
            <Button
              variant="contained"
              onClick={this.submit}
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
          {/* <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                            Existing list of { navTitle }
                        </Typography>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button variant="contained" onClick={this.resetEntries} className={classes.button}>
                                Reset
                            </Button>
                            <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                                Confirm changes
                            </Button>
                        </Grid> */}
        </main>
      </div>
    );
  }
}

DashboardWork.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles), withFirebase)(DashboardWork);
