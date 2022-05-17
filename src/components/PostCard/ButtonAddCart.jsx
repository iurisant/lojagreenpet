import "./styles.css";

import { Component } from "react";

export class ButtonAddCart extends Component {
  render() {
    const { text, onClick, disabled, id } = this.props;

    return (
      <button
        className="buttonAddCart"
        id={id}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}
