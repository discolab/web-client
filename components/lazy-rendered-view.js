import React from 'react';
import ReactDOM from 'react-dom';
import { whenElementVisible } from 'lib/visibility-helpers';

const LazyRenderedView = React.createClass({

  getInitialState() {
    return {
      visible: false
    }
  },

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    if (el) {
      whenElementVisible(el).then(() => this.setState({ visible: true }));
    }
  },

  render() {
    return this.props.children(this.state.visible);
  }

});

export default LazyRenderedView;
