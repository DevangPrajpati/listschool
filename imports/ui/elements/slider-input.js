import React from 'react';
import {Col, Row} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

export default class SliderInput extends React.Component {
  state = {
    currentValue: 0
  };

  constructor(props) {
    super(props);
    this.setValue(props.val);
  }

  handleChange = (value) => {
    const courseFilter = this.setValue(value);
    this.setState({currentValue : value});
  };

  setValue(value) {
    if (this.props.onChange) {
      this.props.onChange(value, (result)=>{
        return result;
      })
    }
  }

  render() {
    const T = i18n.createComponent();
    return (
      <Col xs={8} md={4}>
        <div className="home-filters-wrapper">
          <h1><T>{this.props.label}</T>: {this.state.currentValue > 0 ? <span>{this.state.currentValue+' '+this.props.unit}</span> : <T>any</T>}</h1>
          <input type="range" defaultValue={0} min={0} max={this.props.maximumValue} step={this.props.stepValue}
                 onChange={(e) => this.handleChange(e.target.value)}/>
        </div>
      </Col>
    );
  }


}