import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Contacto() {
  const [validated, setValidated] = useState(false);

  // Manejador de envío para usar la validación nativa y los estilos de Bootstrap
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // evita recarga
      alert("Tu mensaje fue enviado correctamente. ¡Gracias por contactarnos!");
      // ✅ limpia todos los campos del formulario
      form.reset();
      setValidated(false);             // quita estado de validación en React
      form.classList.remove('was-validated'); // y remueve la clase de Bootstrap (por si quedó puesta)
    }
    setValidated(true);
  };

  return (
    
    <section className="mt-6 py-5 bg-light" id="contacto">
      <Container>
        <h2 className="text-center mb-3">Contáctanos</h2>
        <p className="text-center mb-5 text-muted">
          Cuéntanos tu proyecto y agenda una asesoría.
        </p>

        <Form className="mx-auto" style={{ maxWidth: "650px" }} noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" autoComplete="name" required />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa tu nombre.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="correo@ejemplo.com" autoComplete="email" required />
            <Form.Control.Feedback type="invalid">
              Ingresa un correo válido (ej: nombre@dominio.com).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí..." required />
            <Form.Control.Feedback type="invalid">
              Escribe un breve mensaje.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center">
            <Button variant="dark" type="submit">
              Enviar mensaje
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
}

export default Contacto;
