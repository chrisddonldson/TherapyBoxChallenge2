import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

const styles = theme => ({});

class HomePage extends Component {
    constructor(props) {
        super(props)
    }

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log(response.data)
        console.log('Data has been received!nbn!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }


    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <h1> MERN STACK </h1>
                <p>Homepage! Welcome to my website</p>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(HomePage));
