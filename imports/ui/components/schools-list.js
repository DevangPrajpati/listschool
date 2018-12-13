import React from 'react';
import { Row, Alert, Col } from 'react-bootstrap';
import { School } from './school';
import i18n from 'meteor/universe:i18n';

export class SchoolsList extends React.Component {
  constructor() {
    super();
    this.state = {
      gridView: true,
    };
  }
  render() {
    const { schools, canCompare } = this.props;
    const T = i18n.createComponent();
    return (
      schools.length === 0 ? <Alert bsStyle="warning"><T>schoolNotFound</T></Alert> :
      <Row>
        <div className="schools-view-switcher">
          <Col xs={12}>
            <div
              className={
                this.state.gridView
                  ? 'schools-view-switcher-grid active'
                  : 'schools-view-switcher-grid'
              }
              onClick={() => { this.setState({ gridView: true }); }}
            >
              <i className="fa fa-th" aria-hidden="true"></i>
            </div>
            <div
              className={
                !this.state.gridView
                  ? 'schools-view-switcher-list active'
                  : 'schools-view-switcher-list'
              }
              onClick={() => { this.setState({ gridView: false }); }}
            >
              <i className="fa fa-list" aria-hidden="true"></i>
            </div>
          </Col>
        </div>
        {schools.map((school) => (
          <School
            key={ school._id }
            school={ school }
            canCompare={ canCompare }
            gridView={this.state.gridView}
          />
        ))}
      </Row>
    );
  }
}

SchoolsList.propTypes = {
  schools: React.PropTypes.array,
  canCompare: React.PropTypes.bool,
};
