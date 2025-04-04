import React, { Component } from "react";
import axios from "axios";
import "./estilos/App.css";
import CmpProductos from "./componentes/CmpProductos";
import AgregarProducto from "./componentes/AgregarProducto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      filtro: "todos",
      showModal: false, 
    };
  }

  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/productos`);
      this.setState({ productos: response.data });
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  abrirModal = () => {
    this.setState({ showModal: true });
  };
  cerrarModal = () => {
    this.setState({ showModal: false });
  };


  cambiarFiltro = (event) => {
    this.setState({ filtro: event.target.value });
  };

  render() {
    const { productos, filtro, showModal } = this.state;

    // Filtrar productos según la opción seleccionada
    const productosFiltrados = productos.filter((producto) => {
      if (filtro === "enStock") return producto.stock > 0;
      if (filtro === "sinStock") return producto.stock === 0;
      return true; // "todos" muestra todos los productos
    });

    return (
      <div className="container">
        <h1>Gestor de Productos</h1>
        <label>Filtrar por disponibilidad: </label>
        <select onChange={this.cambiarFiltro} value={filtro}>
          <option value="todos">Todos</option>
          <option value="enStock">En stock</option>
          <option value="sinStock">Sin stock</option>
        </select>

        <button onClick={this.abrirModal} className="btn-agregar">
          Agregar Producto
        </button>

        <CmpProductos productos={productosFiltrados} />

        {/* Modal para agregar un producto */}
        {showModal && (
          <AgregarProducto
            cargarProductos={this.cargarProductos} // Pasamos la función para recargar productos
            cerrarModal={this.cerrarModal} // Función para cerrar el modal
          />
        )}
      </div>
    );
  }
}

export default App;
