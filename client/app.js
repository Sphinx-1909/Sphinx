import React from 'react';
//css
import './app.css';
// react-redux
import { connect } from 'react-redux';
//action
import { setToggleSlideMenu } from './redux/nav/action/nav.action';

class App extends React.Component {
  componentDidMount() {
    this.props.setToggleSlideMenu();
  }

  handleClick = e => {
    e.preventDefault();
    this.props.setToggleSlideMenu();
  };
  render() {
    return (
      <div>
        React is working
        <button onClick={e => this.handleClick(e)}>test</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setToggleSlideMenu: () => dispatch(setToggleSlideMenu()),
});

export default connect(null, mapDispatchToProps)(App);
