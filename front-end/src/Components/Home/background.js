import React from 'react';
import Typography from '@material-ui/core/Typography'
// const url = 'https://images.unsplash.com/photo-1502404827602-7de17eb08b64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
// import styles from '../../assets/css/Home/Background.css'
// import styles from '../../assets/css/Home/background.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { minHeight } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    background: '#000000',
    color: '#fff',
    minHeight: '200px'
  },
})

const Background = () => {
  const classes=useStyles();
  return (
    <div className={classes.root}>
      {/* <div className={styles.captionWrap}>
        <h1 className={styles.topCaption}>Jerome Tieh</h1>
        <h2 className={styles.bgCaption}>Digital Art</h2>
        <p className={styles.banner}></p>
        <p className={styles.banner}></p>
        <p className={styles.banner}></p>
      </div> */}
      <Typography>Hello World</Typography>
      
    </div>

  );
}

export default Background;