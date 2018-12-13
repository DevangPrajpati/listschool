import React from 'react';
import { Row, Col, Grid, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '../../modules/recover-password';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <Grid className="main-app-container">
        <Row>
          <Col xs={ 12 }>
            <div className="form-view-container">
              <h4 className="page-header">Recover Password</h4>
              <Alert bsStyle="info">
                Digite seu email abaixo para receber um link para redefinir sua senha.
              </Alert>
              <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit }>
                <FormGroup>
                  <FormControl
                    type="email"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="Email"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success">Recuperar Senha</Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
