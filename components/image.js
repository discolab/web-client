import { loadImage } from 'lib/image-helpers';
import React from 'react';
import 'components/image.css';

const Image = React.createClass({

  getInitialState() {
    return {
      loaded: false
    }
  },

  componentDidMount() {
    loadImage(this.props.src)
      .then(() => this.setState({ loaded: true }))
  },

  render() {
    const { loaded } = this.state;
    const { width, height, src } = this.props;

    const key = [width, height, src].join('|');

    const containerStyle = {
      width: `${width}px`,
      height: `${height}px`
    };

    const placeholderStyle = {
      width: '100%',
      height: '100%',
      opacity: loaded ? 1 : 0
    };

    if (loaded) {
      Object.assign(placeholderStyle, {
        backgroundImage: `url('${src}')`
      });
    }

    return (
      <div className="image image-bg-gradient" key={key} style={containerStyle}>
        <span className="image-placeholder image-bg-gradient" style={placeholderStyle}/>
      </div>
    )
  }

});

export default Image;
