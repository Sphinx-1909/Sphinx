import React from 'react';
import { connect } from 'react-redux';
import './EditChannel.css';
import { editChannelThunk } from '../../redux/channels';
import history from '../../history';
import ShowSubscribers from './ShowSubscribers';

class EditAChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelTitle: '',
      channelDescrpition: '',
    };
  }
  componentDidMount() {
    const { channelTitle, channelDescription } = this.props.channels;

    this.setState({
      channelTitle: channelTitle,
      channelDescrpition: channelDescription,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    // console.log('this.props.match.params.id', this.props.match.params.id);
    // const channelId=this.props.match.params.id
    //const idOfChannelOwner = this.props.activeUser.id;
    const id = this.props.channels.myChannels[0].id;

    const { channelTitle, channelDescription } = this.state;
    this.props.editChannelT({
      id,
      channelTitle,
      channelDescription,
    });
  };
  //only one channel passed in
  render() {
    let myOneChannel = this.props.channels.myChannels[0];
    // console.log(
    //   'this.props.channels.myChannels[0]',
    //   this.props.channels.myChannels[0]
    // );
    if (!myOneChannel) {
      return <div>please hold</div>;
    } else {
      return (
        <div className="liner">
          <div className="contentCenter">
            <form
              onSubmit={ev => ev.handleSubmit(ev)}
              className="editChannel_form"
            >
              <div className="editChannel_form_subHeader">EDIT CHANNEL</div>

              <label className="editChannel_form_item">
                <b>Name</b>
              </label>

              <input
                type="channelTitle"
                name="channelTitle"
                placeholder={`${myOneChannel.channelTitle}`}
                onChange={ev => this.handleChange(ev)}
                className="editChannel_form_input"
              />

              <label className="editChannel_form_item">
                <b>Description</b>
              </label>

              <input
                type="channelDescription"
                name="channelDescription"
                placeholder={`${myOneChannel.channelDescription}`}
                onChange={ev => this.handleChange(ev)}
                className="editChannel_form_input"
              />
              <label className="editChannel_form_item">
                <b>Delete subscribers</b>
                {/*} <ShowSubscribers />*/}
              </label>

              <input
                type="channelsModerators"
                name="channelsModerators"
                onChange={ev => this.handleChange(ev)}
                className="editChannel_form_input"
              />
              <div className="editChannel_form_buttons">
                <button
                  onClick={ev => this.handleSubmit(ev)}
                  type="submit"
                  className="editChannel_form_links"
                >
                  Save
                </button>
                <button
                  onClick={() => history.push('/')}
                  type="button"
                  className="editChannel_form_links_cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  activeUser: state.activeUser,
});

const mapDispatchToProps = dispatch => {
  return {
    editChannelT: editedChannelInfo =>
      dispatch(editChannelThunk(editedChannelInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAChannel);

//get all users that have this channel as myChannels
// drop down menu of everyone and select user to delete
//delete subscribers from
