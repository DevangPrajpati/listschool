import React from 'react';
import {
  Row, Col, Grid, Alert, FormGroup, ControlLabel, FormControl, Button,
} from 'react-bootstrap';
import { handleResetPassword } from '../../modules/reset-password';

export class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({
      component: this,
      token: this.props.params.token,
    });
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
              <h4 className="page-header">Reset Password</h4>
              <Alert bsStyle="info">
                Para redefinir sua senha, digite uma nova abaixo. Você vai será logado com sua nova senha.
              </Alert>
              <form ref="resetPassword" className="reset-password" onSubmit={ this.handleSubmit }>
                <FormGroup>
                  <ControlLabel>Nova Senha</ControlLabel>
                  <FormControl
                    type="password"
                    ref="newPassword"
                    name="newPassword"
                    placeholder="Nova Senha"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Repita a Nova Senha</ControlLabel>
                  <FormControl
                    type="password"
                    ref="repeatNewPassword"
                    name="repeatNewPassword"
                    placeholder="Repita a Nova Senha"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success">Redefinir Senha &amp; Logar</Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
