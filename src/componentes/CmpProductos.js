import React from "react";
import "../estilos/App.css";
function CmpProductos({ productos, cambiarEstado }) {
  return (
    <div className="productos-list">
      {productos.map((producto) => (
        <div key={producto.id} className="producto">
          <h3>{producto.name}</h3>
          <p>{producto.description}</p>
          <p>Precio: ${producto.price}</p>
          <p>Stock: {producto.stock}</p>
          <button onClick={() => cambiarEstado(producto.id)}>
            {producto.stock > 0 ? "Reducir stock" : "Producto sin stock"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CmpProductos;
