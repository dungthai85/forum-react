import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


export default class Paginate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
      this.props.handler(value);
    }

  render () {
    return (
    <div>
      <Pagination count={this.props.pageCount}  page={this.props.currentPage} onChange={this.handleChange}/>
    </div>
  );
  }
}