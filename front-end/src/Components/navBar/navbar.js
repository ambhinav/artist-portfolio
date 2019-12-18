import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Slide from '@material-ui/core/Slide';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  menuItem: {
    textTransform: 'uppercase',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

})); 

const StyledButton = withStyles({
  root: {
    background: 'inherit',
    color: '#fff'
  }
})(Button)

const sections = [
  {
    title: 'work',
    url: '/work'
  },
  {
    title: 'info',
    url: '/info',
  },
];

const navlinks = sections.map(section => {
  return (
    <StyledButton key={section.title} component={Link} to={section.url}>{section.title}</StyledButton>
  )
});

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);


  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }



  const classes = useStyles();
  return (
    <div className={classes.root}>
      {windowWidth > 600
        ?
        <AppBar position="static" style={{ backgroundColor: '#0f2027' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <StyledButton component={Link} to="/" >PORTFOLIO</StyledButton>
            </Typography>
            <Hidden xsDown>
              {navlinks}
            </Hidden>
            <Hidden smUp>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {
                  sections.map(section => (
                    <MenuItem className={classes.menuItem} onClick={handleClose} component={Link} to={section.url} key={section.title}>
                      {section.title}
                    </MenuItem>
                  ))
                }
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
        :
        <React.Fragment>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            style={{background: '#0f2027'}}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <StyledButton component={Link} to="/" >PORTFOLIO</StyledButton>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List
              id="resized-list"
              anchorEl={anchorEl}
              keepmounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                sections.map(section => (
                  <ListItem className={classes.menuItem} onClick={handleClose} component={Link} to={section.url} key={section.title}>
                    <Typography styles={{olor: "#273747"}}>
                      {section.title}
                    </Typography>
                  </ListItem>
                ))
              }
            </List>
          </Drawer>
        </React.Fragment>}
        {/* </HideOnScroll> */}
    </div>
  );
}