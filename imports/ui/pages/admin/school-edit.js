import React from 'react';
import { Row, Col, Grid, Tab, Tabs,  Button, Glyphicon } from 'react-bootstrap';
import SchoolForm from '/imports/ui/containers/admin/school-form';
import UploadCourseForm from '/imports/ui/containers/admin/school-courses/upload-school-course-form';
import AdminSchoolCoursesList from '/imports/ui/containers/admin/school-courses/admin-school-courses-list';

export class SchoolEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      selectedKey: 1,
			schoolId: props.params.schoolId
    };
  }

  handleSelect(key) {
    this.setState({ selectedKey: key });
  }

  render() {
    return (
			<Grid className="main-app-container">
		    <Row>
		      <Col xs={ 12 }>
		        <h1 className="page-header">Edit a school</h1>
		          <Tabs
				    activeKey={this.state.selectedKey}
				    onSelect={this.handleSelect}
				    id="controlled-tab-example"
				  >
				    <Tab eventKey={1} title="General Information">
				      <SchoolForm schoolId={this.state.schoolId} />
				    </Tab>
				    <Tab eventKey={2} title="Courses">
			    	  <Row>
			    	  	<Col xs={ 12 }>
				      	  <UploadCourseForm schoolId={this.state.schoolId}/>
				      	  <AdminSchoolCoursesList schoolId = {this.state.schoolId}/>
				      	</Col>
				      </Row>
				    </Tab>
				    <Tab eventKey={3} title="Accommodation" disabled>
				      Accommodation content
				    </Tab>
				  </Tabs>

		      </Col>
		    </Row>
		  </Grid>
    );

  }
}
