import React from 'react';
import i18n from 'meteor/universe:i18n';

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.initCheck!== undefined ? this.props.initCheck : false,
      labelToTranslateAndDisplay:  props.labelToTranslateAndDisplay,
    };
    this.onClick= props.onClick;
    this.initCheck = this.props.initCheck;
  }
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.onClick(this.state.value, !this.state.isChecked);
  };
  render() {
    const T = i18n.createComponent();
    let style = {
      'paddingRight': '5px',
    };
    return (
      <label style={style}>
        <input type="checkbox"
               checked={this.state.isChecked}
               onChange={this.toggleChange}
               className={this.state.isChecked ? "filter-item active" : "filter-item"}
        />
        <T>{this.state.labelToTranslateAndDisplay}</T>
      </label>
    );
  }
}
