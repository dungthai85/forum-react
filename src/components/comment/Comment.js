import React from 'react';
import Topic from './../topics/singletopic';
import Pagination from '../pagination';
import Comment from './singlecomment';



class Comments extends React.Component {
  constructor(props) {
    super(props);
    var topic = (props.location.search.split('='))[1];
    this.state = {
      topics: {},
      userLikes: {},
      user: {},
      currentpage: 0,
      pagecount:0,
      topic: topic,
      comments: {}

    };

    this.handlePage = this.handlePage.bind(this);

  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.getComment(this.state.topic, 1)
      .then(res => {
        this.setState({
          topics: res.post,
          userLikes: res.userLikes,
          user: res.user,
          currentpage: res.page.currentPage,
          pagecount: res.page.pageCount,
          comments: res.comments
        });
    }
      )
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.state.currentpage !== prevState.currentpage) {
        this.getComment(this.state.topic, this.state.currentpage)
        .then(res => {
          this.setState({
            topics: res.post,
            userLikes: res.userLikes,
            user: res.user,
            currentpage: res.page.currentPage,
            pagecount: res.page.pageCount,
            comments: res.comments
        });
      }
        )
        .catch(err => console.log(err));
      }
  }

  handlePage(page) {
    this.setState({currentpage : page});
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  getComment = async (topic, page) => {
    const response = await fetch(`/api/comments/?topic=${topic}&page=${page}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    const topics = this.state.topics;
    var topicsList = [];
    for(var i = 0; i < topics.length; i++) {
      topicsList.push(<Topic topics={topics[i]} key={topics[i].topicid}/>)
    }

    const comments = this.state.comments;
    var comment = [];
    for(var j = 0; j < comments.length; j++) {
      comment.push(<Comment topics={comments[j]} key={comments[j].topicid}/>)
    }
    return (

      
      <div>
        <br></br>
          {topicsList}
          <br></br>
          {comment}
          <br></br>
          <Pagination currentPage={this.state.currentpage} pageCount={this.state.pagecount} handler={this.handlePage} />
          <br></br>
      </div>
    );
  }
}


export default Comments;
