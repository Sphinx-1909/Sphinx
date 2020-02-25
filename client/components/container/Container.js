import React from 'react';
//css
import './Container.css';
import MapView from '../MapView';

class Container extends React.Component {
  render() {
    return <div className="container">
      <MapView />
    </div>;
  }
}

export default Container;
