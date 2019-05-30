import TDEImage from "assets/img/logo/TDE.png";
import sidebarBgImage from "assets/img/sidebar/sidebar-4.jpg";
import SourceLink from "components/SourceLink";
import React from "react";
import FaGithub from "react-icons/lib/fa/github";
import Control from "funciones/index";
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdChromeReaderMode,
  MdDashboard,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdPages,
  MdRadioButtonChecked,
  MdStar,
  MdViewCarousel,
  MdViewList,
  MdWeb,
  MdAttachMoney
} from "react-icons/lib/md";
import { NavLink } from "react-router-dom";
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink
} from "reactstrap";
import bn from "utils/bemnames";

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

// const navComponents = [
//   { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
//   {
//     to: '/button-groups',
//     name: 'button groups',
//     exact: false,
//     Icon: MdGroupWork,
//   },
//   { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
//   { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
//   {
//     to: '/dropdowns',
//     name: 'dropdowns',
//     exact: false,
//     Icon: MdArrowDropDownCircle,
//   },
//   { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
//   { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
//   { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
//   { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
// ];

// const navContents = [
//   { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
//   { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
// ];

// const pageContents = [
//   { to: "/login", name: "login / signup", exact: false, Icon: MdAccountCircle },
//   {
//     to: "/login-modal",
//     name: "login modal",
//     exact: false,
//     Icon: MdViewCarousel
//   }
// ];

const navProducto = [
  { to: "/producto", name: "Producto", exact: false, Icon: MdDashboard },
  { to: "/producto/crear", name: "Crear Producto", exact: false, Icon: MdWeb },

  {
    to: "/marca",
    name: "Marcas",
    exact: false,
    Icon: MdDashboard
  },
  {
    to: "/presentacion",
    name: "Presentaciones",
    exact: false,
    Icon: MdDashboard
  },
  {
    to: "/tipoproducto",
    name: "Tipo Producto",
    exact: false,
    Icon: MdDashboard
  },
  {
    to: "/unidadmedida",
    name: "Unidad Medida",
    exact: false,
    Icon: MdDashboard
  },
  {
    to: "/novedad/crear",
    name: "Crear novedad",
    exact: false,
    Icon: MdDashboard
  },
  { to: "/entrada", name: "Entrada Producto", exact: false, Icon: MdDashboard }
];

const navUsuarios = [
  {
    to: "/acudiente",
    name: "Acudiente",
    exact: false,
    Icon: MdRadioButtonChecked
  },
  {
    to: "/creartarjeta",
    name: "Registrar tarjeta ",
    exact: false,
    Icon: MdWeb
  },

  { to: "/persona", name: "Registrar persona ", exact: false, Icon: MdStar }
];

const navEntrada = [
  {
    to: "/iniciovigilante",
    name: "Inicio",
    exact: false,
    Icon: MdRadioButtonChecked
  },
  {
    to: "/entradaestudiante/crear",
    name: "Entrada Estudiante",
    exact: false,
    Icon: MdRadioButtonChecked
  },
  {
    to: "/entradavisitante/crear",
    name: "Entrada Visitante",
    exact: false,
    Icon: MdWeb
  },
  {
    to: "/visitante/crear",
    name: "Nuevo Visitante",
    exact: false,
    Icon: MdRadioButtonChecked
  }
];

const navLogin = [
  {
    to: "/login",
    name: "login",
    exact: false,
    Icon: MdDashboard
  }
];

// const navDetalle = [
//   { to: '/detalle', name: 'detalle', exact: false, Icon: MdDashboard },
//   { to: '/detalle/crear', name: 'creae detalle', exact: false, Icon: MdDashboard },
// ];

const navTarjeta = [
  {
    to: "/crearRecarga",
    name: "Recarga ",
    exact: true,
    Icon: MdAttachMoney
  },
  {
    to: "/crearVenta",
    name: "Venta ",
    exact: true,
    Icon: MdAttachMoney
  }
];

const navItems = [
  // { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  // { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
  // { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  // { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
  // {
  //   to: "/crearRecarga",
  //   name: "Recarga ",
  //   exact: true,
  //   Icon: MdAttachMoney
  // },
  // {
  //   to: "/crearVenta",
  //   name: "Venta ",
  //   exact: true,
  //   Icon: MdAttachMoney
  // }
];

const bem = bn.create("sidebar");

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: false,
    isOpenPages: false,
    isOpenProductos: false,
    isOpenDetalles: false,
    isOpenLogin: false,
    isOpenEntrada: false,
    isOpenUsuarios: false,
    isOpenTarjeta: false
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e("background")} style={sidebarBackground} />
        <div className={bem.e("content")}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={TDEImage}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">TDE</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e("nav-item")}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-case"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e("nav-item-icon")} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Components</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Contents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
            {Control(
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Usuarios")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Usuarios</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenUsuarios
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "4"
            )}
            <Collapse isOpen={this.state.isOpenUsuarios}>
              {navUsuarios.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {Control(
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Entrada")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Entrada Usuarios</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenEntrada
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "2"
            )}
            <Collapse isOpen={this.state.isOpenEntrada}>
              {navEntrada.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {/* {Control( 
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("EntradaEstudiante")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Entrada Estudiante</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenEntradaEstudiantes
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
               "vigilante"
            )} 
            <Collapse isOpen={this.state.isOpenEntradaEstudiantes}>
              {navEntradaEstudiante.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {Control( 
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Entrada")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Entrada Visitante</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenEntradaVisitante
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "vigilante"
            )} 
            <Collapse isOpen={this.state.isOpenEntradaVisitante}>
              {navEntradaVisitante.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
            {Control(
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Productos")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Productos</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenProductos
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "3"
            )}
            <Collapse isOpen={this.state.isOpenProductos}>
              {navProducto.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {Control(
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Tarjeta")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdPages className={bem.e("nav-item-icon")} />
                    <span className="">Tarjeta</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenTarjeta
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "3"
            )}
            <Collapse isOpen={this.state.isOpenTarjeta}>
              {navTarjeta.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Detalles')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Detalles</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenDetalles
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenDetalles}>
              {navDetalle.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
            {/* <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("Pages")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdPages className={bem.e("nav-item-icon")} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform"
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e("nav-item")}
              onClick={this.handleClick("Login")}
            >
              <BSNavLink className={bem.e("nav-item-collapse")}>
                <div className="d-flex">
                  <MdPages className={bem.e("nav-item-icon")} />
                  <span className="">Login</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e("nav-item-icon")}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenLogin
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform"
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenLogin}>
              {navLogin.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-case"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
