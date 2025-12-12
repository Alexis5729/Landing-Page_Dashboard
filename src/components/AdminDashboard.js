import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { getServicios, createServicio, updateServicio, deleteServicio } from "../services/serviciosService";
import { getPlanes, createPlan, updatePlan, deletePlan } from "../services/planesService";

function AdminDashboard() {
  // --- SERVICIOS ---
  const [servicios, setServicios] = useState([]);

  const [servicioForm, setServicioForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    categoria: "",
  });

  const [modoEdicionServicio, setModoEdicionServicio] = useState(false);

  // Estado para “ver detalle” de un servicio
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [mostrarDetalleServicio, setMostrarDetalleServicio] = useState(false);

  function manejarCambioServicio(e) {
    const { name, value } = e.target;
    setServicioForm(prev => ({ ...prev, [name]: value }));
  }

  async function manejarSubmitServicio(e) {
    e.preventDefault();

    if (!servicioForm.nombre.trim()) {
      alert("El servicio debe tener un nombre.");
      return;
    }

    try {
      if (modoEdicionServicio) {
        const actualizado = await updateServicio(servicioForm.id, {
          nombre: servicioForm.nombre,
          descripcion: servicioForm.descripcion,
          categoria: servicioForm.categoria,
        });

        setServicios(prev => prev.map(s => (s.id === actualizado.id ? actualizado : s)));
        setModoEdicionServicio(false);
      } else {
        const creado = await createServicio({
          nombre: servicioForm.nombre,
          descripcion: servicioForm.descripcion,
          categoria: servicioForm.categoria,
        });

        setServicios(prev => [...prev, creado]);
      }

      setServicioForm({ id: null, nombre: "", descripcion: "", categoria: "" });
    } catch (e) {
      console.error(e);
      alert("Error al guardar servicio en la API.");
    }
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [servs, pls] = await Promise.all([getServicios(), getPlanes()]);
        setServicios(servs);
        setPlanes(pls);
      } catch (e) {
        console.error(e);
        setError("No se pudo conectar con Mockoon (API). Revisa que esté encendido y el puerto.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  function editarServicio(servicio) {
    // Carga datos en el formulario y activa modo edición
    setServicioForm(servicio);
    setModoEdicionServicio(true);
  }

  async function eliminarServicio(id) {
    if (!window.confirm("¿Seguro que deseas eliminar este servicio?")) return;

    try {
      await deleteServicio(id);
      setServicios(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      console.error(e);
      alert("Error al eliminar servicio en la API.");
    }
  }

  // Funciones para abrir/cerrar detalle de servicio
  function verDetalleServicio(servicio) {
    setServicioSeleccionado(servicio);
    setMostrarDetalleServicio(true);
  }

  function cerrarDetalleServicio() {
    setMostrarDetalleServicio(false);
    setServicioSeleccionado(null);
  }

  // --- PLANES ---
  const [planes, setPlanes] = useState([]);

  const [planForm, setPlanForm] = useState({
    id: null,
    nombre: "",
    rangoPotencia: "",
    beneficios: "",
  });

  const [modoEdicionPlan, setModoEdicionPlan] = useState(false);

  // Estado para “ver detalle” de un plan
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [mostrarDetallePlan, setMostrarDetallePlan] = useState(false);

  function manejarCambioPlan(e) {
    const { name, value } = e.target;
    setPlanForm(prev => ({ ...prev, [name]: value }));
  }

  async function manejarSubmitPlan(e) {
    e.preventDefault();

    if (!planForm.nombre.trim()) {
      alert("El plan debe tener un nombre.");
      return;
    }

    try {
      if (modoEdicionPlan) {
        const actualizado = await updatePlan(planForm.id, {
          nombre: planForm.nombre,
          rangoPotencia: planForm.rangoPotencia,
          beneficios: planForm.beneficios,
        });

        setPlanes(prev => prev.map(p => (p.id === actualizado.id ? actualizado : p)));
        setModoEdicionPlan(false);
      } else {
        const creado = await createPlan({
          nombre: planForm.nombre,
          rangoPotencia: planForm.rangoPotencia,
          beneficios: planForm.beneficios,
        });

        setPlanes(prev => [...prev, creado]);
      }

      setPlanForm({ id: null, nombre: "", rangoPotencia: "", beneficios: "" });
    } catch (e) {
      console.error(e);
      alert("Error al guardar plan en la API.");
    }
  }

  function editarPlan(plan) {
    setPlanForm(plan);
    setModoEdicionPlan(true);
  }

  function eliminarPlan(id) {
    if (window.confirm("¿Seguro que deseas eliminar este plan?")) {
      setPlanes(prev => prev.filter(p => p.id !== id));
      if (planForm.id === id) {
        setPlanForm({ id: null, nombre: "", rangoPotencia: "", beneficios: "" });
        setModoEdicionPlan(false);
      }
    }
  }

  // Funciones para abrir/cerrar detalle de plan
  function verDetallePlan(plan) {
    setPlanSeleccionado(plan);
    setMostrarDetallePlan(true);
  }

  function cerrarDetallePlan() {
    setMostrarDetallePlan(false);
    setPlanSeleccionado(null);
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Mostrar mensaje de error si no hay conexión con Mockoon */}
      {error && (
        <div className="alert alert-danger m-3">
          {error}
        </div>
      )}

      <nav className="navbar navbar-expand navbar-white navbar-light border-bottom shadow-sm bg-white">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            HelioAndes Admin
          </span>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3" style={{ minHeight: "calc(100vh - 56px)" }}>
            <h6 className="text-uppercase text-muted">Menú</h6>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item mb-1">
                <span className="nav-link active">Servicios</span>
              </li>
              <li className="nav-item mb-1">
                <span className="nav-link text-white-50">Planes</span>
              </li>
              <li className="nav-item mt-3">
                <small className="text-white-50">
                  * Panel de administración para gestionar catálogo de HelioAndes.
                </small>
              </li>
            </ul>
          </aside>

          <main className="col-12 col-md-9 col-lg-10 p-4">
            <div className="mb-4">
              <h2 className="fw-bold">Panel de Administración</h2>
              <p className="text-muted mb-0">
                Gestiona los <strong>servicios</strong> y <strong>planes</strong> que se muestran en la landing de HelioAndes.
              </p>
            </div>

            {/* Card Servicios */}
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  {modoEdicionServicio ? "Editar Servicio" : "Crear Nuevo Servicio"}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={manejarSubmitServicio} className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Ej: Estudio Energético"
                      value={servicioForm.nombre}
                      onChange={manejarCambioServicio}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Categoría</label>
                    <input
                      type="text"
                      name="categoria"
                      className="form-control"
                      placeholder="Ej: Diagnóstico, Instalación..."
                      value={servicioForm.categoria}
                      onChange={manejarCambioServicio}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      rows="2"
                      placeholder="Describe brevemente el servicio"
                      value={servicioForm.descripcion}
                      onChange={manejarCambioServicio}
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {modoEdicionServicio ? "Guardar cambios" : "Agregar servicio"}
                    </button>
                    {modoEdicionServicio && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setServicioForm({ id: null, nombre: "", descripcion: "", categoria: "" });
                          setModoEdicionServicio(false);
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="card-footer">
                <h6 className="mb-3">Servicios registrados</h6>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicios.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No hay servicios registrados.
                          </td>
                        </tr>
                      )}
                      {servicios.map(servicio => (
                        <tr key={servicio.id}>
                          <td>{servicio.nombre}</td>
                          <td>{servicio.categoria}</td>
                          <td>{servicio.descripcion}</td>
                          <td className="text-end">
                            {/* Botón Ver detalle */}
                            <Button
                              variant="info"
                              size="sm"
                              className="me-2"
                              onClick={() => verDetalleServicio(servicio)}
                            >
                              Ver Detalle
                            </Button>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => editarServicio(servicio)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => eliminarServicio(servicio.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Card Planes */}
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  {modoEdicionPlan ? "Editar Plan" : "Crear Nuevo Plan"}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={manejarSubmitPlan} className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Nombre del plan</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Ej: Básico, Optimizado..."
                      value={planForm.nombre}
                      onChange={manejarCambioPlan}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Rango de potencia</label>
                    <input
                      type="text"
                      name="rangoPotencia"
                      className="form-control"
                      placeholder="Ej: 3–5 kW"
                      value={planForm.rangoPotencia}
                      onChange={manejarCambioPlan}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Beneficios</label>
                    <textarea
                      name="beneficios"
                      className="form-control"
                      rows="2"
                      placeholder="Beneficios incluidos en el plan"
                      value={planForm.beneficios}
                      onChange={manejarCambioPlan}
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      {modoEdicionPlan ? "Guardar cambios" : "Agregar plan"}
                    </button>
                    {modoEdicionPlan && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setPlanForm({ id: null, nombre: "", rangoPotencia: "", beneficios: "" });
                          setModoEdicionPlan(false);
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="card-footer">
                <h6 className="mb-3">Planes registrados</h6>
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Rango potencia</th>
                        <th>Beneficios</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planes.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No hay planes registrados.
                          </td>
                        </tr>
                      )}
                      {planes.map(plan => (
                        <tr key={plan.id}>
                          <td>{plan.nombre}</td>
                          <td>{plan.rangoPotencia}</td>
                          <td>{plan.beneficios}</td>
                          <td className="text-end">
                            {/* Botón Ver detalle */}
                            <Button
                              variant="info"
                              size="sm"
                              className="me-2"
                              onClick={() => verDetallePlan(plan)}
                            >
                              Ver Detalle
                            </Button>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => editarPlan(plan)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => eliminarPlan(plan.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal detalle Servicio */}
            <Modal
              show={mostrarDetalleServicio}
              onHide={cerrarDetalleServicio}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Detalle del servicio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {servicioSeleccionado && (
                  <>
                    <p><strong>Nombre:</strong> {servicioSeleccionado.nombre}</p>
                    <p><strong>Categoría:</strong> {servicioSeleccionado.categoria || "Sin categoría"}</p>
                    <p><strong>Descripción:</strong></p>
                    <p className="mb-0">
                      {servicioSeleccionado.descripcion || "Sin descripción"}
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={cerrarDetalleServicio}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal detalle PLAN */}
            <Modal
              show={mostrarDetallePlan}
              onHide={cerrarDetallePlan}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Detalle del plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {planSeleccionado && (
                  <>
                    <p><strong>Nombre del plan:</strong> {planSeleccionado.nombre}</p>
                    <p><strong>Rango de potencia:</strong> {planSeleccionado.rangoPotencia || "Sin rango definido"}</p>
                    <p><strong>Beneficios:</strong></p>
                    <p className="mb-0">
                      {planSeleccionado.beneficios || "Sin beneficios detallados"}
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={cerrarDetallePlan}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

          </main>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
