import { html, css } from 'lit-element/lit-element.js';

/**
 * Adds basic properties to all chart elements.
 * @polymer
 * @mixinFunction
 */
export const ChartPropertyMixin = function(superClass) {
  return class extends superClass {
    static get properties() {
      return {
        chart: Object,
        data: Object,
        options: Object
      };
    }

    constructor() {
      super();
      this.__hasData = false;
    }

    static get styles() {
      return css`
        :host {
          display: inline-block;
          position: relative;
        }

        :host > div {
          height: 100%;
        }

        #canvas {
          width: 100%;
          height: 100%;
        }
      `;
    }

    render() {
      return html`
        <div>
          <canvas id="canvas"></canvas>
        </div>
      `;
    }

    shouldUpdate(changes) {
      if (changes.has('data') || changes.has('options')) {
        this._configurationChanged(this.data, this.options);
      }

      if (changes.has('chart')) {
        this.dispatchEvent(new CustomEvent('chart-changed', { detail: this.chart, bubbles: true, composed: true }));
        return false;
      }

      return true;
    }

    updated() {
      if (this.__hasData && this.isConnected) {
        this._queue();
      }
    }

    _configurationChanged(data) {
      if ((this.__type === 'bubble' || data.labels) && data.datasets) {
        this.__hasData = true;
      } else {
        this.__hasData = false;
      }
    }
  }
};
