import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelsList from './ChannelsList';
import { TextField } from '@material-ui/core';
//css
import './SearchForm.css';

class ChannelSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.channelData.allChannels,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('whatis nextProps', nextProps);
    this.setState({
      filtered: nextProps.channelData.allChannels,
    });
  }

  handleChange = e => {
    let currentChannelList = [];
    // new list to display when filtering in the search
    let newFilteredList = [];

    // If the search bar isn't empty
    if (e.target.value !== '') {
      currentChannelList = this.props.channelData.allChannels;

      // filtering the list of channels based on the keyword on the search box
      newFilteredList = currentChannelList.filter(item => {
        // converting the list item to lowercase to uniformly search without having to worry about capitlization
        const lowerCaseName = item.channelTitle.toString().toLowerCase();
        // check to see if the current list item includes the search term
        const filterNameSearch = e.target.value.toString().toLowerCase();

        return lowerCaseName.includes(filterNameSearch);
      });
    } else {
      // Reset the set newFilteredList to original task list when clearing out the searchbar
      newFilteredList = this.props.channelData.allChannels;
    }
    // Set the filtered state based on what our rules added to newFilteredList
    this.setState({
      filtered: newFilteredList,
    });
    // console.log('currentChannelList', currentChannelList);
    // console.log('newFilteredList', newFilteredList);
  };

  checkIfSubscribed = () => {
    return this.props.channelData.myChannels.map(channel => channel.id);
  };

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          <div className="searchBox_search_subHeader">SEARCH CHANNELS</div>
          <input
            type="text"
            className="searchBox_search_subHeader_input"
            onChange={this.handleChange}
            placeholder="Search for different channels..."
          />
          <ChannelsList
            channels={this.state.filtered}
            checkList={this.checkIfSubscribed()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelData: state.channels,
});

export default connect(mapStateToProps, null)(ChannelSearch);
