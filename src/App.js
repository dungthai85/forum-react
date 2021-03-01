import React from 'react';
import './App.css';
import Home from './components/topics/Home';
import AddPost from './components/topics/AddTopic';
import Comment from './components/topics/Comment';
import NavBar from './components/navbar';
import { Switch, Route, Redirect } from 'react-router-dom';


class App extends React.Component {


  render() {

    return (

      
      <div>
        <NavBar />
        <Switch>
        <Redirect exact from="/" to="/Home" />
          <Route path="/Home" component={Home} exact />
          <Route path="/AddPost" component={AddPost} />
          <Route path="/Comment" component={Comment} />
          </Switch>

      </div>
    );
  }
}


export default App;
