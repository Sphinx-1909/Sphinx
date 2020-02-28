import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ChannelSearch extends Component {
  state = {
    channelSearch: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      logInError: false,
      [name]: value,
    });
  };
  handleSubmit = ev => {
    ev.preventDefault();
  };
  render() {
    return (
      <div>
        <input name="channelSearch" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Search!</button>
      </div>
    );
  }
}

export default ChannelSearch;
