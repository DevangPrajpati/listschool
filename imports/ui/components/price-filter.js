import React from 'react';
import {Col, Row} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';

export default class PriceFilter extends React.Component {
  state = {
    price: 0
  };

  constructor(props, price) {
    super(props);
    this.setValueInTheSchoolPriceFilter(price);
  }

  changePriceInFilterSchoolAndSlider = (value) => {
    const schoolFilter = this.setValueInTheSchoolPriceFilter(value);
    this.setState({'price': schoolFilter.price});
  };

  setValueInTheSchoolPriceFilter(value) {
    const schoolFilter = Session.get('SchoolFilter');
    schoolFilter.price = value;
    Session.set('SchoolFilter', schoolFilter);
    return schoolFilter;
  }

  render() {
    const T = i18n.createComponent();
    return (
      <Col xs={8} md={4}>
        <div className="home-filters-wrapper">
          <h1><T>price</T>: {this.state.price > 0 ? <span>{this.state.price}$</span> : <T>any</T>}</h1>
          <input type="range" defaultValue={0} min={0} max={5000} step={10}
                 onChange={(e) => this.changePriceInFilterSchoolAndSlider(e.target.value)}/>
        </div>
      </Col>
    );
  }


}