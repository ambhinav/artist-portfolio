import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import { theWork } from './workData'
import MediaCard from './card';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#0f2027',
    paddingBottom: '50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StyledGrid = withStyles({
  root: {
    background: 'inherit',
    minHeight: '600px'
  }
})(Grid)

const Work = () => {

  const classes = useStyles();

  // const [theWork, getWork] = React.useState(null)

  // React.useEffect({

  // })
  const data = Object.keys(theWork)
  console.log(data)
  data.map(category => console.log(theWork[category]))


  return (

    <div className={classes.root}>
      <StyledGrid container justify='center' spacing={3} direction='column' alignItems='center'>
        {data.map(category => (
          <div key={category}>
            <Grid justify='center' container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
              <Typography variant="h4" style={{ color: '#fa462f' }} >
                {category}
              </Typography>
            </Grid>
            <Divider />
            <Grid justify="center" container spacing={3}> 
              {theWork[category].map(item => (
                <Grid item >
                  <MediaCard imgUrl={item.imgUrl} title={item.title} decription={item.text} />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </StyledGrid>
    </div>
  );
}

export default Work