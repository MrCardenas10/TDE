import TDEImage from "assets/img/logo/TDE.png";
import sidebarBgImage from "assets/img/sidebar/sidebar-4.jpg";
import SourceLink from "components/SourceLink";
import React from "react";
import FaGithub from "react-icons/lib/fa/github";
import Control from "funciones/index";
import {
  MdGroupAdd,
  MdGrade,
  MdLocalRestaurant,
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
  MdDoNotDisturbOff,
  MdWeb,
  MdShoppingCart,
  MdAttachMoney,
  MdAddShoppingCart,
  MdMonetizationOn,
  MdTitle,
  MdWhatshot,
  MdAddCircle,
  MdAddCircleOutline,
  MdPeople,
  MdAccountBalance,
  MdContacts,
  MdPanTool
} from "react-icons/lib/md";
import { GoCreditCard } from "react-icons/lib/go";

import { FaCartArrowDown, FaTags, FaSkyatlas } from "react-icons/lib/fa";
import {
  IoIosEye,
  IoCoffee,
  IoIosPeople,
  IoHome,
  IoAndroidPersonAdd,
  IoAndroidWalk
} from "react-icons/lib/io";
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
  { to: "/inicioVendedor", name: "Inicio Vendedor", exact: false, Icon: MdGrade },
  { to: "/producto", name: "Producto", exact: false, Icon: MdGrade },
  {
    to: "/producto/crear",
    name: "Crear Producto",
    exact: false,
    Icon: MdLocalRestaurant
  },

  {
    to: "/marca",
    name: "Marcas",
    exact: false,
    Icon: FaTags
  },
  {
    to: "/presentacion",
    name: "Presentaciones",
    exact: false,
    Icon: FaSkyatlas
  },
  {
    to: "/tipoproducto",
    name: "Tipo Producto",
    exact: false,
    Icon: MdTitle
  },
  {
    to: "/unidadmedida",
    name: "Unidad Medida",
    exact: false,
    Icon: MdWhatshot
  },
  {
    to: "/novedad/crear",
    name: "Crear novedad",
    exact: false,
    Icon: MdDoNotDisturbOff
  },
  {
    to: "/entrada",
    name: "Entrada Producto",
    exact: false,
    Icon: MdAddCircleOutline
  }
];

const navUsuarios = [
  {
    to: "/secretaria",
    name: "Inicio",
    exact: false,
    Icon: IoHome
  },
  {
    to: "/acudiente",
    name: "Acudientes",
    exact: false,
    Icon: MdRadioButtonChecked
  },
  {
    to: "/creartarjeta",
    name: "Tarjetas",
    exact: false,
    Icon: GoCreditCard
  },

  { to: "/persona", name: "Usuarios ", exact: false, Icon: MdGroupAdd }
];

const navEntrada = [
  {
    to: "/iniciovigilante",
    name: "Inicio",
    exact: false,
    Icon: MdAccountBalance
  },
  {
    to: "/entradaestudiante/crear",
    name: "Entrada Estudiante",
    exact: false,
    Icon: IoAndroidWalk
  },
  {
    to: "/entradavisitante/crear",
    name: "Entrada Visitante",
    exact: false,
    Icon: MdContacts
  },
  {
    to: "/visitante/crear",
    name: "Visitante",
    exact: false,
    Icon: IoAndroidPersonAdd
  }
];

const navEstudiante = [
  {
    to: "/inicioEstudiante",
    name: "Inicio",
    exact: false,
    Icon: MdAccountBalance
  },
  {
    to: "/compras",
    name: "Compras",
    exact: false,
    Icon: MdAccountBalance
  },
  {
    to: "/verRecargas",
    name: "Recargas",
    exact: false,
    Icon: IoAndroidWalk
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

const navVenta = [
  {
    to: "/crearVenta",
    name: "Crear venta ",
    exact: true,
    Icon: MdAddShoppingCart
  },
  {
    to: "/Ventas",
    name: "Ver ventas ",
    exact: true,
    Icon: FaCartArrowDown
  }
];

const navRecarga = [
  {
    to: "/crearRecarga",
    name: "Crear recarga ",
    exact: true,
    Icon: MdAttachMoney
  },
  {
    to: "/Recargas",
    name: "Ver recargas ",
    exact: true,
    Icon: IoIosEye
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
    isOpenRecarga: false,
    isOpenVenta: false,
    isOpenEstudiante: false
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
                    <IoIosPeople className={bem.e("nav-item-icon")} />
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
                onClick={this.handleClick("Estudiante")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <IoIosPeople className={bem.e("nav-item-icon")} />
                    <span className="">Transacciones</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenEstudiante
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transitionDuration: "0.3s",
                      transitionProperty: "transform"
                    }}
                  />
                </BSNavLink>
              </NavItem>,
              "1"
            )}
            <Collapse isOpen={this.state.isOpenEstudiante}>
              {navEstudiante.map(({ to, name, exact, Icon }, index) => (
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
                    <MdPanTool className={bem.e("nav-item-icon")} />
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
                onClick={this.handleClick("Recarga")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdMonetizationOn className={bem.e("nav-item-icon")} />
                    <span className="">Recargas</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenRecarga
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
            <Collapse isOpen={this.state.isOpenRecarga}>
              {navRecarga.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span> </span>
                    <Icon className={bem.e("nav-item-icon")} />

                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {Control(
              <NavItem
                className={bem.e("nav-item")}
                onClick={this.handleClick("Venta")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <MdShoppingCart className={bem.e("nav-item-icon")} />
                    <span className="">Ventas</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e("nav-item-icon")}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenVenta
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
            <Collapse isOpen={this.state.isOpenVenta}>
              {navVenta.map(({ to, name, exact, Icon }, index) => (
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
                onClick={this.handleClick("Productos")}
              >
                <BSNavLink className={bem.e("nav-item-collapse")}>
                  <div className="d-flex">
                    <IoCoffee className={bem.e("nav-item-icon")} />
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
