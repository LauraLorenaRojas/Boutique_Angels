const cotizarModelo = require('../modelos/cotizarModelo');
const { sendMail } = require('../config/mailer');

const cotizarControlador = {
    crearCotizacion: async (req) => {
        const clienteId = req.session.usuario.clienteId;
        if (!clienteId) {
            throw new Error('clienteId no está definido en la sesión.');
        }

        const nuevaCotizacion = {
            personas: req.body.personas,
            evento: req.body.evento,
            fecha: req.body.fecha,
            hora: req.body.hora,
            buffet: req.body.buffet,
            carne: req.body.carne,
            arroz: req.body.arroz,
            bebida: req.body.bebida,
            postre: req.body.postre,
            mesa_dulces: req.body.mesa_dulces,
            decoracion: req.body.decoracion,
            alquiler: req.body.alquiler,
            musica: req.body.musica,
            total: req.body.total,
            clienteId: clienteId
        };

        const existeCotizacion = await cotizarModelo.verificarCotizacion(clienteId, nuevaCotizacion.fecha);
        if (existeCotizacion) {
            throw new Error('Ya existe una cotización para esta fecha.');
        }

        try {
            const resultado = await cotizarModelo.crearCotizacion(nuevaCotizacion);
            
            const emailCliente = req.session.usuario.correo;
            const subject = '¡Reserva Confirmada!';
            const html = `
                <div style="font-family: Arial, sans-serif; color: #444; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                    <div style="text-align: center; padding-bottom: 20px;">
                       <img src="https://drive.google.com/uc?export=view&id=1DG8NLCCRibj2YmM6w6hQAmSODBidP_m4" alt="Boutique Angels" style="max-width: 100px;" />
                        <h2 style="color: #c5a44f;">¡Reserva Confirmada!</h2>
                    </div>
                    <p style="font-size: 16px;">Hola <strong>${req.session.usuario.nombres}</strong>,</p>
                    <p>Gracias por elegir <strong>Boutique Angels</strong> para tu evento. Nos complace informarte que tu reserva fue realizada exitosamente. <br> Detalles de la reserva:</p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li><strong>Evento:</strong> ${nuevaCotizacion.evento}</li>
                        <li><strong>Fecha:</strong> ${nuevaCotizacion.fecha}</li>
                        <li><strong>Hora:</strong> ${nuevaCotizacion.hora}</li>
                        <li><strong>Número de personas:</strong> ${nuevaCotizacion.personas}</li>
                        <li><strong>Total:</strong> $${nuevaCotizacion.total}</li>
                    </ul>
                    <p>Si tienes alguna pregunta o necesitas modificar algún detalle, no dudes en contactarnos.</p>
                    <p>¡Esperamos verte pronto!</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 14px; color: #888;">Boutique Angels</p>
                        <p style="font-size: 14px; color: #888;">Ubicación: Paipa-Boyacá</p>
                        <p style="font-size: 14px; color: #888;">Contacto: boutique@gmail.com | Teléfono: +57 313 3670007</p>
                    </div>
                </div>
            `;

            await sendMail(emailCliente, subject, html);  // Enviar correo en formato HTML

            return resultado;
        } catch (err) {
            console.error('Error al registrar la cotización:', err);
            throw err;
        }
    }
};

module.exports = cotizarControlador;
