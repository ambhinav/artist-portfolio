import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Contact from "./contact";

const useStyles = makeStyles(theme => ({
  root: {
    // background: 'linear-gradient(180deg, #273747 10%, #203a43 30%, #2c5364 60%)',
    background: "linear-gradient(180deg, #0f2027 , #203a43 , #2c5364 )",
    textAlign: "center",
    paddingBottom: "5em"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  avatarImg: {
    height: "250px",
    paddingTop: "5em"
  },
  bannerText: {
    backgroundColor: "black",
    opacity: ".8",
    width: "75%",
    margin: "auto",
    borderRadius: "10px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
}));

const Info = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <img
              src="https://www.shareicon.net/data/512x512/2016/09/15/829442_man_512x512.png"
              alt="avatar"
              className={classes.avatarImg}
            />
            <div className={classes.bannerText}>
              <h3
                style={{
                  fontSize: "56px",
                  paddingTop: "40px",
                  color: "#fa462f"
                }}
              >
                Jerome Tieh
              </h3>
              <hr
                style={{
                  borderTop: "5px white",
                  width: "50%"
                }}
              />
              <p
                style={{
                  fontSize: "20px",
                  padding: "1em",
                  color: "#fa462f"
                }}
              >
                Photoshop | Illustrator | Unity
              </p>
              <p
                style={{
                  fontSize: "20px",
                  padding: "1em",
                  color: "#fa462f"
                }}
              >
                Concept Art | World Building & Character Design
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Contact />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Info;
