import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import NavBar from '../../../Components/AdminPages/navBar'
import DragAndDrop from '../../../Components/AdminPages/utils/dropzone';
import api from '../../../api';

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

class DashboardWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            title: '',
            category: '',
            imgUrl: '',
        };
        this.deleteEntry = this.deleteEntry.bind(this);
        // this.resetEntries = this.resetEntries.bind(this);
        this.newEntry = this.newEntry.bind(this);
        this.watchImgUrl = this.watchImgUrl.bind(this);
        this.watchTitle = this.watchTitle.bind(this);
        this.watchCategory = this.watchCategory.bind(this);
        this.submit = this.submit.bind(this);
    }

    deleteEntry(event) {
        const id = event.currentTarget.value;
    }

    // resetEntries () {
    //     resetEntries();
    // }

    newEntry () {
        const {
            imgUrl,
            title,
            category,
        } = this.state;
        const payload = {
            imgUrl,
            title,
            category,
            edit: true
        };
        this.setState({
            imgUrl: '',
            title: '',
            text: '',
            heading: '',
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
            text: event.target.value
        });
    }

    handleOnDrop(files, rejectedFiles) {
        if (rejectedFiles) {
            if (rejectedFiles.length > 1) {
                alert('Upload one file at a time')
            } else {
                alert('Upload only image files')
            }
        } else if (files) {
            const fileToUpload = files[0];
            // upload to cloud storage
            this.props.firebase.uploadFileToStorage('/Test/' + fileToUpload.name, fileToUpload)
                .then(snapshot => {
                    console.log("Uploaded a file!")
                    this.props.firebase.getImageUrl('Test' + fileToUpload.name)
                        .then(url => 
                            this.setState({
                                imgUrl: url
                            })
                        ).catch(err =>
                            console.log(err, "Error obtaining image url")
                        )
                }).catch(err => 
                    console.log(err, "Error uploading file to storage!")     
                )
        } else {
            alert('Uknown error, please contact administrator')
        }
    }

    submit() {
        const {
            imgUrl,
            title,
            category,
        } = this.state;
        const payload = {
            imgUrl,
            title,
            category,
            edit: true
        };

        this.props.firebase.getUserToken()
            .then(token => {
                // make api call to upload to worksByCategory
                api.post('/admin/work/putartwork', payload)
                .then(res =>
                    console.log("Uploaded to firestore!")
                ).catch(err => {
                    console.log(err, "error")
                })
            }).catch(err => console.log(err, "Error"))

        this.setState({
            imgUrl: '',
            title: '',
            category: ''
        });
    }

    render() {
        const { classes } = this.props;
        const { imgUrl, title, category } = this.state;
        const navTitle = 'Work';
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={navTitle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Add new pictures to { navTitle }
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
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.submit} className={classes.button}>
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardWork);
