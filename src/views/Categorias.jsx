import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "bootstrap-icons/font/bootstrap-icons.css";

const FormularioAgregarCategoria = () => {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idCategoriaEditando, setIdCategoriaEditando] = useState(null);

  const categoriasCollection = collection(db, "categorias");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoria.nombre || !categoria.descripcion) {
      setMensaje({
        tipo: "warning",
        texto: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    try {
      const datosCategoria = {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      };

      if (modoEdicion) {
        const categoriaRef = doc(db, "categorias", idCategoriaEditando);
        await updateDoc(categoriaRef, datosCategoria);
        setMensaje({ tipo: "success", texto: "¡Categoría actualizada correctamente!" });
      } else {
        await addDoc(categoriasCollection, datosCategoria);
        setMensaje({ tipo: "success", texto: "¡Categoría agregada exitosamente!" });
      }

      setCategoria({ nombre: "", descripcion: "" });
      setModoEdicion(false);
      setIdCategoriaEditando(null);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al guardar:", error);
      setMensaje({ tipo: "danger", texto: "Ocurrió un error al guardar." });
    }
  };

  const obtenerCategorias = async () => {
    const data = await getDocs(categoriasCollection);
    setCategorias(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const eliminarCategoria = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta categoría?");
    if (confirmacion) {
      const categoriaDoc = doc(db, "categorias", id);
      await deleteDoc(categoriaDoc);
      obtenerCategorias();
      setMensaje({ tipo: "info", texto: "Categoría eliminada correctamente." });
    }
  };

  const editarCategoria = (cat) => {
    setCategoria({
      nombre: cat.nombre,
      descripcion: cat.descripcion,
    });
    setModoEdicion(true);
    setIdCategoriaEditando(cat.id);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const categoriasFiltradas = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4 mb-4">
            <Card.Body>
              <h4 className="mb-4 text-center text-primary">
                <i className="bi bi-folder-plus me-2"></i>
                {modoEdicion ? "Editar Categoría" : "Agregar Nueva Categoría"}
              </h4>

              {mensaje && (
                <Alert
                  variant={mensaje.tipo}
                  onClose={() => setMensaje(null)}
                  dismissible
                >
                  {mensaje.texto}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Shampoos, Mascarillas..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    placeholder="Describe brevemente la categoría"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant={modoEdicion ? "warning" : "primary"}>
                    <i className={`bi ${modoEdicion ? "bi-pencil" : "bi-save"} me-2`}></i>
                    {modoEdicion ? "Actualizar Categoría" : "Guardar Categoría"}
                  </Button>
                  {modoEdicion && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setModoEdicion(false);
                        setIdCategoriaEditando(null);
                        setCategoria({ nombre: "", descripcion: "" });
                      }}
                    >
                      Cancelar Edición
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <h5 className="mb-3 text-secondary">
            <i className="bi bi-list-ul me-2"></i>Listado de Categorías
          </h5>

          <Form.Control
            type="text"
            placeholder="Buscar por nombre..."
            className="mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <Table bordered hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoriasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No hay categorías registradas
                  </td>
                </tr>
              ) : (
                categoriasFiltradas.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.nombre}</td>
                    <td>{cat.descripcion}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => editarCategoria(cat)}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarCategoria(cat.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioAgregarCategoria;
