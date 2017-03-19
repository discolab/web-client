import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ESC } from 'lib/keys';
import 'components/overlay.css';

const OPACITY_TRANSITION_DURATION = 200;

class Overlay extends React.Component {

  constructor() {
    super();
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  onDocumentClick(e) {
    if (e.target.classList.contains('overlay')) {
      this.props.onClose();
    }
  }

  onDocumentKeyDown(e) {
    if (e.which === ESC) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    window.document.addEventListener('keydown', this.onDocumentKeyDown);
    window.document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.onDocumentKeyDown);
    window.document.removeEventListener('click', this.onDocumentClick);
  }

  render() {
    const { children } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={OPACITY_TRANSITION_DURATION}
        transitionName="overlay"
      >
        <div className="overlay">
          <div className="overlay__wrapper">
            <div className="overlay__content">
              {children}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }

}

export default Overlay;
