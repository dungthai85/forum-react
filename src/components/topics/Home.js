import React from 'react';
import Topic from './singletopic';
import Pagination from '../pagination';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: {},
      userLikes: {},
      user: {},
      currentpage: 0,
      pagecount:0,

    };

    this.handlePage = this.handlePage.bind(this);

    this.getTopics(1)
    .then(res => {
      this.setState({
        topics: res.topics,
        userLikes: res.userLikes,
        user: res.user,
        currentpage: res.page.currentPage,
        pagecount: res.page.pageCount});
  }
    )
    .catch(err => console.log(err));

  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    // this.getTopics(1)
    //   .then(res => {
    //     console.log("STATE1: " + this.state.currentpage);
    //     this.setState({
    //       topics: res.topics,
    //       userLikes: res.userLikes,
    //       user: res.user,
    //       currentpage: res.page.currentPage,
    //       pagecount: res.page.pageCount});
    // }
    //   )
    //   .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.state.currentpage !== prevState.currentpage) {
        this.getTopics(this.state.currentpage)
        .then(res => {
          this.setState({
            topics: res.topics,
            userLikes: res.userLikes,
            user: res.user,
            currentpage: res.page.currentPage,
            pagecount: res.page.pageCount});
      }
        )
        .catch(err => console.log(err));
      }
  }

  handlePage(page) {
    this.setState({currentpage : page});
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  getTopics = async (page) => {
    const response = await fetch(`/api/topics/?page=${page}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    const topics = this.state.topics;
    var items = [];
    for(var i = 0; i < topics.length; i++) {
      items.push(<Topic topics={topics[i]} key={topics[i].topicid} />)
    }
    return (

      
      <div>
        <br></br>
          {items}
          <br></br>
          <Pagination currentPage={this.state.currentpage} pageCount={this.state.pagecount} handler={this.handlePage} />
          <br></br>
      </div>
    );
  }
}


export default Home;
