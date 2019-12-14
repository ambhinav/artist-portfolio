import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { Email } from '@material-ui/icons'
import { Paper } from '@material-ui/core';
import RecentWorkMobile from './recent-work-mobile'
import RecentWork from './recent-work';
import { minHeight } from '@material-ui/system';
// import { theWork } from '../../assets/Images/'

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    // background: 'linear-gradient(180deg, #273747 10%, #203a43 30%, #2c5364 60%)',
    // background: 'linear-gradient(180deg, #0f2027 , #203a43 , #2c5364 )',
    background: '#0f2027',
    minHeight: '950px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    textAlign: 'center'
  },
  bottomPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 'auto',
  },
  segment: {
    margin: '0',
    paddingTop: '60px',
    paddingBottom: '45px',
  },
  container: {
    boxSizing: 'border-box',
    maxWidth: '1290px',
    marginLeft: '100px',
    marginRight: '100px',
    position: 'relative',
  },
  articleStyle: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'inherit',
    textSizeAdjust: '100%',
  },
  myTextstyle: {
    color: 'rgb(44,54,67)',
    fontSize: '16px',
    lineHeight: '26px',
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    maxHeight: 345,
  },
  seperator: {
    backgroundColor: '#8db255',
    display: 'block',
    width: '85px',
    height: '2px',
    margin: '0 auto',
    marginBottom: '30px',
    marginTop: '15px',
    verticalAlign: 'baseline',
    opacity: '1',
  }
});

const StyledGrid = withStyles({
  root: {
    background: 'inherit',
    textAlign: 'center',
    minHeight: '900px'
  }
})(Grid)

const placeHolderLogo = []

const Content = (props) => {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);

  const { classes } = props

  return (
    <div className={classes.root}>
      <StyledGrid>
        <Grid container justify='space-evenly' direction='row'>
          <Grid item xs={6}>
            <Typography>
              Insert logo here
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='h4' style={{ color: '#fa462f' }}> Illustration & Character Design </Typography>
        <div className={classes.seperator} />
        {/* {windowWidth > 600
          ?
          <RecentWork />
          :
          <RecentWorkMobile />
        } */}
        <RecentWork />
      </StyledGrid>
    </div >
  );
}

export default withStyles(styles)(Content)
