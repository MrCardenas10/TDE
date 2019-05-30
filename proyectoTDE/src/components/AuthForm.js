import logo200Image from "assets/img/logo/logo_200.png";
import PropTypes from "prop-types";
import React from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import App from "./../App";
import { URL } from "./../config/config";
import ReactDOM from "react-dom";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

class AuthForm extends React.Component {
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return "Login";
    }

    if (!buttonText && this.isSignup) {
      return "Signup";
    }

    return buttonText;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  login = {
    email: "",
    password: ""
  };

  logiarse(value) {
    axios({
      method: "post",
      url: `${URL}/login`,
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok !== null) {
        localStorage.token = datos.token;
        localStorage.rol = datos.rol.rol;
        localStorage.nombres = datos.nombres.nombres;
        localStorage.email = datos.email;
        localStorage.apellidos = datos.apellidos.apellidos;
        localStorage.password = datos.password;
        // ReactDOM.render(<App />, document.getElementById("root"));

        //  return <Redirect to='/producto' />
        // this.props.history.push('/producto/ordenservicio')

        this.login = {
          email: "",
          password: ""
        };
      } else {
        this.setState({
          sweetShow: true,
          sweetText: datos.error,
          sweetTitle: "Verifica los datos",
          sweetType: "error"
        });
      }
      console.log(respuesta);
    });
  }

  render() {
    const { showLogo, onLogoClick } = this.props;

    return (
      <Formik
        initialValues={this.login}
        validationSchema={LoginSchema}
        onSubmit={value => {
          this.logiarse(value);
        }}
      >
        {({ errors, values }) => (
          <Form>
            {showLogo && (
              <div className="text-center pb-4">
                <img
                  src={logo200Image}
                  className="rounded"
                  style={{ width: 60, height: 60, cursor: "pointer" }}
                  alt="logo"
                  onClick={onLogoClick}
                />
              </div>
            )}
            <FormGroup>
              <Label for="email">Correo: </Label>
              <Field
                placeholder="ejemplologin@gmail.com"
                type="email"
                name="email"
                className="form-control"
              />
              {errors.email && values.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Field
                placeholder="*********"
                type="password"
                name="password"
                className="form-control"
              />
              {errors.password && values.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}
            </FormGroup>
            <hr />
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              type="submit"
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export const STATE_LOGIN = "LOGIN";
export const STATE_SIGNUP = "SIGNUP";

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func
};

AuthForm.defaultProps = {
  authState: "LOGIN",
  showLogo: true,
  usernameLabel: "Email",
  usernameInputProps: {
    type: "email",
    placeholder: "your@email.com"
  },
  passwordLabel: "Password",
  passwordInputProps: {
    type: "password",
    placeholder: "your password"
  },
  confirmPasswordLabel: "Confirm Password",
  confirmPasswordInputProps: {
    type: "password",
    placeholder: "confirm your password"
  },
  onLogoClick: () => {}
};

export default AuthForm;
