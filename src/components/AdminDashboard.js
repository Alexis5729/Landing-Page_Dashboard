// src/components/AdminDashboard.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Dashboard tipo AdminLTE para HelioAndes
  - CRUD de Servicios
  - CRUD de Planes

  Todo se maneja en memoria con useState (no hay backend).
*/

function AdminDashboard() {
  // --- SERVICIOS ---
  const [servicios, setServicios] = useState([
    { id: 1, nombre: "Estudio Energético", descripcion: "Análisis de consumo y radiación", categoria: "Diagnóstico" },
    { id: 2, nombre: "Instalación Certificada", descripcion: "Montaje con técnicos SEC", categoria: "Instalación" },
  ]);

  const [servicioForm, setServicioForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    categoria: "",
  });

  const [modoEdicionServicio, setModoEdicionServicio] = useState(false);

  function manejarCambioServicio(e) {
    const { name, value } = e.target;
    setServicioForm(prev => ({ ...prev, [name]: value }));
  }

  function manejarSubmitServicio(e) {
    e.preventDefault();

    // Validación simple
    if (!servicioForm.nombre.trim()) {
      alert("El servicio debe tener un nombre.");
      return;
    }

    if (modoEdicionServicio) {
      // Editar
      setServicios(prev =>
        prev.map(s =>
          s.id === servicioForm.id ? { ...servicioForm, id: s.id } : s
        )
      );
      setModoEdicionServicio(false);
    } else {
      // Crear
      const nuevo = {
        ...servicioForm,
        id: Date.now(),
      };
      setServicios(prev => [...prev, nuevo]);
    }

    // Limpiar formulario
    setServicioForm({ id: null, nombre: "", descripcion: "", categoria: "" });
  }

  function editarServicio(servicio) {
    // Carga datos en el formulario y activa modo edición
    setServicioForm(servicio);
    setModoEdicionServicio(true);
  }

  function eliminarServicio(id) {
    if (window.confirm("¿Seguro que deseas eliminar este servicio?")) {
      setServicios(prev => prev.filter(s => s.id !== id));
      // Si estaba editando ese mismo, limpiar el formulario
      if (servicioForm.id === id) {
        setServicioForm({ id: null, nombre: "", descripcion: "", categoria: "" });
        setModoEdicionServicio(false);
      }
    }
  }

  // --- PLANES ---
  const [planes, setPlanes] = useState([
    { id: 1, nombre: "Básico", rangoPotencia: "3–5 kW", beneficios: "Estudio + instalación estándar + monitoreo básico" },
    { id: 2, nombre: "Optimizado", rangoPotencia: "10–15 kW", beneficios: "Estudio avanzado + instalación optimizada + monitoreo avanzado" },
  ]);

  const [planForm, setPlanForm] = useState({
    id: null,
    nombre: "",
    rangoPotencia: "",
    beneficios: "",
  });

  const [modoEdicionPlan, setModoEdicionPlan] = useState(false);

  function manejarCambioPlan(e) {
    const { name, value } = e.target;
    setPlanForm(prev => ({ ...prev, [name]: value }));
  }

  function manejarSubmitPlan(e) {
    e.preventDefault();

    if (!planForm.nombre.trim()) {
      alert("El plan debe tener un nombre.");
      return;
    }

    if (modoEdicionPlan) {
      setPlanes(prev =>
        prev.map(p =>
          p.id === planForm.id ? { ...planForm, id: p.id } : p
        )
      );
      setModoEdicionPlan(false);
    } else {
      const nuevo = {
        ...planForm,
        id: Date.now(),
      };
      setPlanes(prev => [...prev, nuevo]);
    }

    setPlanForm({ id: null, nombre: "", rangoPotencia: "", beneficios: "" });
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

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* HEADER tipo AdminLTE */}
      <nav className="navbar navbar-expand navbar-white navbar-light border-bottom shadow-sm bg-white">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            HelioAndes Admin
          </span>          
        </div>
      </nav>

      {/* LAYOUT con sidebar + contenido */}
      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR simple (tipo AdminLTE) */}
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

          {/* CONTENIDO PRINCIPAL */}
          <main className="col-12 col-md-9 col-lg-10 p-4">
            {/* ENCABEZADO DE CONTENIDO */}
            <div className="mb-4">
              <h2 className="fw-bold">Panel de Administración</h2>
              <p className="text-muted mb-0">
                Gestiona los <strong>servicios</strong> y <strong>planes</strong> que se muestran en la landing de HelioAndes.
              </p>
            </div>

            {/* CARD SERVICIOS */}
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

            {/* CARD PLANES */}
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

          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
