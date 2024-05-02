export default function ContactInfo() {
    return (<div className="container">
    <h2>¿Quiénes somos?</h2>
    <div className="info">
      <h2 id="title" />
      <p>
        Somos una tienda fundada en 2024 dedicada a la venta minorista de
        productos tecnológicos a buen precio.
      </p>
      <p>
        Nuestro teléfono de atención al cliente es 91606066 de 8h a 19h de lunes a
        viernes.
      </p>
      <p>
        Pero también puedes contactarnos a cualquier hora con el siguiente
        formulario.
      </p>
      <form action="" method="post">
        <div className="form-control">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" placeholder="Nombre" required="" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required="" />
        </div>
        <div className="form-control">
          <label htmlFor="subject">Asunto</label>
          <input type="text" id="subject" placeholder="Asunto" />
        </div>
        <div className="form-control">
          <label htmlFor="message">Mensaje</label>
          <textarea name="message" placeholder="Mensaje" defaultValue={""} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
  )
};