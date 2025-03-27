import React from "react";
import { Table, Button, Image, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProductos = ({ productos, openEditModal, openDeleteModal }) => {
  return (
    <>
      <h5 className="mb-3 text-secondary">
        <i className="bi bi-box-seam me-2"></i>Listado de Productos
      </h5>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No hay productos registrados
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  {producto.imagen ? (
                    <Image
                      src={producto.imagen}
                      width="50"
                      height="50"
                      roundedCircle
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className="text-muted">Sin imagen</span>
                  )}
                </td>
                <td>{producto.nombre}</td>
                <td>
                  <Badge bg="success" pill>
                    C${parseFloat(producto.precio).toFixed(2)}
                  </Badge>
                </td>
                <td>
                  <Badge bg="info" className="text-white">
                    {producto.categoria}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(producto)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => openDeleteModal(producto)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TablaProductos;
