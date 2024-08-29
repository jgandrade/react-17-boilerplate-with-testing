import React from "react";
import ComponentController from "./ComponentController";

export default class ComponentView extends ComponentController {
  render() {
    return (
      <div>
        <p data-test-id="value-text">{this.state.sampleStateNumber}</p>
        <button data-test-id="btn-click" onClick={() => this.incrementStateNumber()}>
          Increment Number
        </button>
      </div>
    );
  }
}
