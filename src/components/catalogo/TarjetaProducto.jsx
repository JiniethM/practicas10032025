import { Card, Col, Button } from "react-bootstrap";

const TarjetaProducto = ({ producto, openEditModal }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Card>
        {producto.imagen && (
          <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
        )}
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            Precio: C${producto.precio} <br />
            Categoría:{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {producto.categoria}
              {producto.color && (
                <div
                  style={{
                    backgroundColor: producto.color,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    border: "1px solid #000",
                  }}
                  title={`Color: ${producto.color}`}
                />
              )}
            </span>
          </Card.Text>
          <Button variant="warning" onClick={() => openEditModal(producto)}>
            Editar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;
