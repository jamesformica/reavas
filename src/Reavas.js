import { Component } from 'react';
import PropTypes from 'prop-types';

class Reavas extends Component {
  constructor() {
    super();
    this.loop = this.loop.bind(this);

    this.lastCheck = window.performance.now();
    this.fpsInterval = 1000 / 60;

    // used for debugging
    this.frameCount = 0;
    this.startTime = this.lastCheck;
  }

  componentDidMount() {
    this.canvas = document.getElementById(this.props.canvasId);
    this.context = this.canvas.getContext("2d");

    const rect = this.canvas.getBoundingClientRect();
    this.canvas.setAttribute('width', rect.width);
    this.canvas.setAttribute('height', rect.height);

    this.setup && this.setup(this.canvas, this.context);

    window.requestAnimationFrame(this.loop);
  }

  loop(timestamp) {
    window.requestAnimationFrame(this.loop);

    const elapsed = timestamp - this.lastCheck
    if (elapsed > this.fpsInterval) {
      this.lastCheck = timestamp - (elapsed % this.fpsInterval);

      const w = this.canvas.width;
      const h = this.canvas.height;

      this.context = this.canvas.getContext("2d");
      this.context.beginPath();
      this.context.clearRect(0, 0, w, h);
      this.paint && this.paint(this.canvas, this.context);

      if (this.props.debug) {
        const sinceStart = timestamp - this.startTime;
        const currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
        console.log("Elapsed time", Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
      }
    }
  }

  render() { return null; }
}

Reavas.defaultProps = {
  debug: false
}

Reavas.propTypes = {
  canvasId: PropTypes.string.isRequired,
  debug: PropTypes.bool
};

export default Reavas;
