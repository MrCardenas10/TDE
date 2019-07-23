import { STATE_LOGIN, STATE_SIGNUP } from "components/AuthForm";
import GAListener from "components/GAListener";
import { EmptyLayout, LayoutRoute, MainLayout } from "components/Layout";
import AuthModalPage from "pages/AuthModalPage";
import AuthPage from "pages/AuthPage";
// pages
import Entrada from "pages/Entrada/Entrada";
import Recuperar from "pages/producto/Recuperar";
import Reset from "pages/producto/Reset";
import EntradaEstudiante from "pages/EntradaEstudiante/EntradaEstudiante";
import InicioVigilante from "pages/EntradaEstudiante/InicioVigilante";
import ModificarVisitante from "pages/Visitante/ModificarVisitante";
import RegistroVisitante from "pages/Visitante/RegistroVisitante";
import Login from "pages/producto/Login";
import CrearRecarga from "pages/Recarga/CrearRecarga";
import Recargas from "pages/Recarga/Recargas";
import CrearVenta from "pages/Venta/CrearVenta";
import Ventas from "pages/Venta/Ventas";
import CrearMarca from "pages/producto/CrearMarca";
import CrearNovedad from "pages/producto/CrearNovedad";
import CrearPresentacion from "pages/producto/CrearPresentacion";
import CrearTipoProducto from "pages/producto/CrearTipoProducto";
import CrearEntradaP from "pages/producto/CrearEntradaP";
import CrearUnidadMedida from "pages/producto/CrearUnidadMedida";
import ModalMarca from "pages/producto/ModalMarca";
import ModalNovedades from "pages/producto/ModalNovedades";
import ModalProducto from "pages/producto/ModalProducto";
import ModalPresentacion from "pages/producto/ModalPresentacion";
import ModalTipoProducto from "pages/producto/ModalTipoProducto";
import ModalUnidadMedida from "pages/producto/ModalUnidadMedida";
import Producto from "pages/producto/Producto";
import InicioVendedor from "pages/producto/InicioVendedor";
import CrearProducto from "pages/producto/CrearProducto";
import acudiente from "./pages/acudiente/acudiente";
import ModalAcudiente from "./pages/acudiente/ModalAcudiente";
import Acudientelis from "./pages/acudiente/Acudientelis";
import modificarAcudiente from "./pages/acudiente/modificarAcudiente";
//Estudiente
import ViEstudiante from "./pages/estudiante/ViEstudiante";
import verRecargas from "./pages/estudiante/verRecargas";
import verCompras from "./pages/estudiante/verCompras";
//Persona
import persona from "./pages/persona/persona";
import Secretaria from "./pages/persona/Secretaria";
import Modificar_persona from "./pages/persona/Modificar_persona";
//tajeta
import creartarjeta from "./pages/tarjeta/creartarjeta";
import listar_tarjeta from "./pages/tarjeta/listar_tarjeta";
import React from "react";
import componentQueries from "react-component-queries";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import "./styles/reduction.css";

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute // Usuarios
              exact
              path="/acudiente"
              layout={MainLayout}
              component={acudiente}
            />
            <LayoutRoute // Usuarios
              exact
              path="/secretaria"
              layout={MainLayout}
              component={Secretaria}
            />

            <LayoutRoute
              exact
              path="/Acudiente/modificar/:id_acudiente"
              layout={MainLayout}
              component={ModalAcudiente}
            />

            <LayoutRoute
              exact
              path="/persona"
              layout={MainLayout}
              component={persona}
            />

            <LayoutRoute // Estudiante
              exact
              path="/compras"
              layout={MainLayout}
              component={verCompras}
            />
            <LayoutRoute
              exact
              path="/verRecargas"
              layout={MainLayout}
              component={verRecargas}
            />
            <LayoutRoute
              exact
              path="/inicioEstudiante"
              layout={MainLayout}
              component={ViEstudiante}
            />

            <LayoutRoute //Producto
              exact
              path="/recuperar"
              layout={EmptyLayout}
              component={Recuperar}
            />
            <LayoutRoute //Producto
              exact
              path="/reset"
              layout={EmptyLayout}
              component={Reset}
            />

            <LayoutRoute
              exact
              path="/creartarjeta"
              layout={MainLayout}
              component={creartarjeta}
            />

            <LayoutRoute //Producto
              exact
              path="/login"
              layout={EmptyLayout}
              component={Login}
            />
            <LayoutRoute //Entrada
              exact
              path="/entradavisitante/crear"
              layout={MainLayout}
              component={Entrada}
            />

            <LayoutRoute
              exact
              path="/visitante/crear"
              layout={MainLayout}
              component={RegistroVisitante}
            />

            <LayoutRoute
              exact
              path="/iniciovigilante"
              layout={MainLayout}
              component={InicioVigilante}
            />

            <LayoutRoute
              exact
              path="/visitante/modificar/:id_visitante"
              layout={MainLayout}
              component={ModificarVisitante}
            />

            <LayoutRoute
              exact
              path="/entradaestudiante/crear"
              layout={MainLayout}
              component={EntradaEstudiante}
            />

            <LayoutRoute //Producto
              exact
              path="/producto"
              layout={MainLayout}
              component={Producto}
            />
            <LayoutRoute
              exact
              path="/producto/crear"
              layout={MainLayout}
              component={CrearProducto}
            />
            <LayoutRoute
              exact
              path="/inicioVendedor"
              layout={MainLayout}
              component={InicioVendedor}
            />
            <LayoutRoute
              exact
              path="/marca"
              layout={MainLayout}
              component={CrearMarca}
            />
            <LayoutRoute
              exact
              path="/entrada"
              layout={MainLayout}
              component={CrearEntradaP}
            />
            <LayoutRoute
              exact
              path="/marca/modificar/:id"
              layout={MainLayout}
              component={ModalMarca}
            />

            <LayoutRoute
              exact
              path="/presentacion"
              layout={MainLayout}
              component={CrearPresentacion}
            />
            <LayoutRoute
              exact
              path="/presentacion/modificar/:id"
              layout={MainLayout}
              component={ModalPresentacion}
            />

            <LayoutRoute
              exact
              path="/tipoproducto"
              layout={MainLayout}
              component={CrearTipoProducto}
            />
            <LayoutRoute
              exact
              path="/tipoproducto/modificar/:id"
              layout={MainLayout}
              component={ModalTipoProducto}
            />

            <LayoutRoute
              exact
              path="/unidadmedida"
              layout={MainLayout}
              component={CrearUnidadMedida}
            />
            <LayoutRoute
              exact
              path="/unidadmedida/modificar/:id"
              layout={MainLayout}
              component={ModalUnidadMedida}
            />
            <LayoutRoute
              exact
              path="/producto/modificar/:id"
              layout={MainLayout}
              component={ModalProducto}
            />
            <LayoutRoute
              exact
              path="/novedad/crear"
              layout={MainLayout}
              component={CrearNovedad}
            />
            <LayoutRoute
              exact
              path="/novedad/modificar/:id"
              layout={MainLayout}
              component={ModalNovedades}
            />

            <LayoutRoute //Recarga
              exact
              path="/crearRecarga"
              layout={MainLayout}
              component={CrearRecarga}
            />
            <LayoutRoute //Recarga
              exact
              path="/Recargas"
              layout={MainLayout}
              component={Recargas}
            />

            <LayoutRoute //Venta
              exact
              path="/crearVenta"
              layout={MainLayout}
              component={CrearVenta}
            />
            <LayoutRoute //Venta
              exact
              path="/Ventas"
              layout={MainLayout}
              component={Ventas}
            />

            {localStorage.rol === "2" ? (
              <Redirect to="/iniciovigilante" />
            ) : localStorage.rol === "3" ? (
              <Redirect to="/inicioVendedor" />
            ) : localStorage.rol === "4" ? (
              <Redirect to="/secretaria" />
            ) : localStorage.rol === "1" ? (
              <Redirect to="/inicioEstudiante" />
            ) : (
                      <Redirect to="/login" />
                    )}
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
