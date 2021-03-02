import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    marginTop: theme.mixins.toolbar.minHeight
  },
  drawerModal: {
    zIndex: theme.zIndex.appBar
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#000000' }} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <TopDrawer />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Forum Web Project
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
function TopDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, top: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Add Post', 'Login', 'Logout'].map((text, index) => {

          if (text === 'Login') {
            return (<MenuItem onClick={() => {window.location = 'http://localhost:3001/Login'}} key={index}> 
            <ListItemText primary={text} />
          </MenuItem> );
          } else {
            var link = '/' + text.replace(" ", '');
             return (<MenuItem component={Link} to={link} key={index}> 
            <ListItemText primary={text} />
          </MenuItem> );
          }

        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {
        <React.Fragment key={'top'}>
          <MoreVertIcon onClick={toggleDrawer(true)}>{'top'}</MoreVertIcon>
          <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer(false)} classes={{
          paper: classes.drawerPaper,
          modal: classes.drawerModal
        }} >
            {list('top')}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}