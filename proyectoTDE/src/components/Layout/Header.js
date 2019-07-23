import React from "react";
import ReactDOM from "react-dom";

import Login from "./../../pages/producto/Login";
import ActualizarPerfil from "./../../pages/persona/ActualizarPerfil";
import ActualizarPassword from "./../../pages/persona/ActualizarPassword";
import bn from "utils/bemnames";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp
} from "react-icons/lib/md";

import Avatar from "components/Avatar";
import { UserCard } from "components/Card";
import Notifications from "components/Notifications";
import SearchInput from "components/SearchInput";

import withBadge from "hocs/withBadge";

import { notificationsData } from "demos/header";

const bem = bn.create("header");

const MdNotificationsActiveWithBadge = withBadge({
  size: "md",
  color: "primary",
  style: {
    top: -10,
    right: -10,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center"
  },
  children: <small>5</small>
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: [],
      abrir_modal: false,
      password_modal:false
    };
  }
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false
  };

  handleClick = event => {
    this.setState({
      abrir_modal: false,
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
      password_modal:false

    });
    axios({
      method: "get",
      url: `${URL}/logout?token=${localStorage.token}`
    }).then(respuesta => {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("email");
      localStorage.removeItem("nombres");
      localStorage.removeItem("telefono");
      localStorage.removeItem("apellidos");
      localStorage.removeItem("genero");
      localStorage.removeItem("id_persona");
      localStorage.removeItem("password");
      window.location = "/login";
      ReactDOM.render(<Login />, document.getElementById("root"));
    });
    event.preventDefault();
    event.stopPropagation();
  };

  modal_persona(id, event) {
    event.preventDefault();
    event.stopPropagation();
    axios({
      method: "get",
      url: `${URL}/Persona/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          persona: r.data,
          abrir_modal: true,
          isOpenNotificationPopover: false,
          isNotificationConfirmed: false,
          isOpenUserCardPopover: false,
      password_modal:false

        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  modal_password(event) {
    event.preventDefault();
    event.stopPropagation();
        this.setState({
          password_modal:true,
          abrir_modal: false,
          isOpenNotificationPopover: false,
          isNotificationConfirmed: false,
          isOpenUserCardPopover: false
        });
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
      password_modal:false,
        abrir_modal:false
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({
        isNotificationConfirmed: true,
        isOpenNotificationPopover: false,
        isOpenUserCardPopover: false,
        password_modal:false,
        abrir_modal:false

      });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
      isNotificationConfirmed: false,
      isOpenNotificationPopover: false,
      password_modal:false,
    });
    this.setState({
      abrir_modal: false
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b("bg-white")}>
        <Nav navbar className="mr-2">
          <Button onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar />

        <Nav navbar className={bem.e("nav-right")}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative" />
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>
          <NavItem>
            {/* <Button
              type="submit"
              className="btn btn-success float-right"
              onClick={this.salir()}
            >
              Submit
            </Button> */}
          </NavItem>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={localStorage.nombres}
                  subtitle={localStorage.apellidos}
                  text={localStorage.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem
                      tag="button"
                      action
                      className="border-light"
                    />

                    <ListGroupItem
                      onClick={this.handleClick}
                      tag="button"
                      action
                      className="border-light"
                    >
                      <MdExitToApp /> Cerrar Sesión
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={event =>
                        this.modal_persona(localStorage.id_persona, event)
                      }
                      tag="button"
                      action
                      className="border-light"
                    >
                      <MdExitToApp /> Actualizar Perfil
                      
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={event =>
                        this.modal_password(event)
                      }
                      tag="button"
                      action
                      className="border-light"
                    >
                      <MdExitToApp /> Actualizar Contraseña
                      
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
        <ActualizarPerfil
          abrir_modal={this.state.abrir_modal}
          persona={this.state.persona}
        />
        <ActualizarPassword
          password_modal={this.state.password_modal}
        />

      </Navbar>
    );
  }
}

export default Header;
