import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { FileText } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export const metadata = {
  title: "Términos y Condiciones | AMC Soluciones Perú",
  description: "Términos y Condiciones de AMC Soluciones Perú.",
};

export default function TerminosPage() {
  return (
    <PageTransition>
      <PageHero
        overline="Legal"
        title="Términos y Condiciones"
        description="Términos y condiciones legales para el uso de nuestra plataforma y servicios."
        icon={FileText}
      />
      
      <div className="container-amc py-6 sm:py-10">
        <Breadcrumb items={[{ label: "Términos y Condiciones" }]} />
      </div>

      <section className="container-amc pb-20">
        <FadeIn>
          <div className="card-base p-6 sm:p-10 max-w-4xl mx-auto prose prose-invert prose-sm sm:prose-base prose-headings:font-display prose-headings:font-bold prose-a:text-gold hover:prose-a:text-amber-400">
            <h3>Información general del comercio</h3>
            <ul>
              <li><strong>Razón Social:</strong> AMC Soluciones Perú</li>
              <li><strong>RUC:</strong> [Completar RUC]</li>
              <li><strong>Dirección:</strong> [Completar Dirección]</li>
              <li><strong>Teléfono:</strong> +51 984 569 125</li>
              <li><strong>Correo Electrónico:</strong> ventas@amcsolucionesperu.com</li>
            </ul>

            <h3>Aceptación de Términos y Condiciones</h3>
            <p>
              El uso de esta plataforma implica la aceptación de los presentes Términos y Condiciones. Indica que tu comercio se reserva el derecho de actualizar estos términos en cualquier momento, notificando a los usuarios a través de los medios correspondientes.
            </p>

            <h3>Registro y Cuenta de usuario</h3>
            <ul>
              <li>Para realizar compras, el usuario debe registrarse proporcionando datos verídicos.</li>
              <li>Requisitos para el registro o uso de la web (ejm: ser mayor de edad).</li>
              <li>Es responsabilidad del usuario mantener la confidencialidad de su cuenta.</li>
              <li>Cualquier uso indebido de la cuenta será responsabilidad del usuario titular.</li>
            </ul>

            <h3>Productos y servicios</h3>
            <ul>
              <li>Describe de forma clara los productos y servicios ofrecidos.</li>
              <li>La disponibilidad de stock puede estar sujeta a cambios sin previo aviso.</li>
              <li>Se pueden aplicar restricciones de venta según las políticas del comercio (ejm: cantidades mínimas o máximas).</li>
              <li>En caso de periodo de prueba, detalla los plazos, la renovación automática (en caso aplique), las notificaciones al cliente, etc.</li>
            </ul>

            <h3>Precios y formas de pago</h3>
            <ul>
              <li>Los precios deben ser presentados en moneda local o extranjera.</li>
              <li>Incluye métodos de pago aceptados: tarjetas, transferencias, billeteras digitales, etc.</li>
              <li>Los precios incluyen o excluyen impuestos según corresponda.</li>
              <li>Seguridad de la plataforma de pagos y responsabilidad del cliente.</li>
            </ul>

            <h3>Proceso de compra</h3>
            <ul>
              <li>Detalla los pasos para realizar una compra en la plataforma.</li>
              <li>Incluye la confirmación y validación del pedido y posibles motivos de cancelación por parte de tu comercio.</li>
            </ul>

            <h3>Envíos y entrega</h3>
            <ul>
              <li>Incluye la cobertura de envíos y tiempos estimados de entrega.</li>
              <li>Detalla los costos de envío y condiciones aplicables, además de la política sobre retrasos y problemas en la entrega.</li>
            </ul>

            <h3>Protección de datos personales</h3>
            <ul>
              <li>Cumplimiento con la Ley N° 29733 de Protección de Datos Personales en Perú.</li>
              <li>Detalla el uso y finalidad de los datos recolectados.</li>
              <li>Incluye los derechos del usuario sobre su información y cómo ejercerlos.</li>
            </ul>

            <h3>Propiedad intelectual</h3>
            <ul>
              <li>Todo el contenido del sitio (logos, imágenes, textos) está protegido por derechos de autor.</li>
              <li>Incluye las restricciones en el uso de la información publicada en la plataforma.</li>
            </ul>

            <h3>Responsabilidad y limitaciones</h3>
            <ul>
              <li>El comercio no se hace responsable por fallos técnicos de la web.</li>
              <li>Uso adecuado de los productos o servicios adquiridos.</li>
              <li>Límites de responsabilidad en caso de inconvenientes ajenos al comercio.</li>
            </ul>

            <h3>Legislación aplicable y resolución de conflictos</h3>
            <ul>
              <li>Este documento se rige por la legislación peruana.</li>
              <li>Los conflictos serán resueltos mediante conciliación, Indecopi o instancias judiciales correspondientes.</li>
            </ul>

            <h3>Contacto y soporte</h3>
            <p>
              En caso de consulta o reclamo, contáctanos al <strong>+51 984 569 125</strong> en nuestros horarios de atención de Lunes a Viernes de 9:00 a 18:00 y Sábados de 9:00 a 13:00.
            </p>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
