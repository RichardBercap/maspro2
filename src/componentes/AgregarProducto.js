import React, { Component } from "react";
import axios from "axios";
import './../estilos/Modal.css'

class AgregarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      stock: "",
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Función para agregar un nuevo producto
  agregarProducto = async (e) => {
    e.preventDefault();
    const { name, description, price, stock } = this.state;
    try {
      const nuevoProducto = { name, description, price: parseFloat(price), stock: parseInt(stock) };
      await axios.post(`${process.env.REACT_APP_API_URL}/productos`, nuevoProducto);
      this.props.cargarProductos(); 
      this.props.cerrarModal(); 
    } catch (error) {
      console.error("Error al agregar producto", error);
    }
  };

  render() {
    const { name, description, price, stock } = this.state;
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Agregar Producto</h2>
          <form onSubmit={this.agregarProducto}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={this.handleChange}
              required
            />
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={this.handleChange}
              required
            />
            <div className="modal-buttons">
              <button type="submit">Agregar</button>
              <button type="button" onClick={this.props.cerrarModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AgregarProducto;
