import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { FileText } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export const metadata = {
  title: "Política de Cambio y Devoluciones | AMC Soluciones Perú",
  description: "Política de Cambio y Devoluciones de AMC Soluciones Perú.",
};

export default function PoliticasDevolucionPage() {
  return (
    <PageTransition>
      <PageHero
        overline="Legal"
        title="Política de Cambio y Devoluciones"
        description="Condiciones para cambios y devoluciones de productos adquiridos en nuestra plataforma."
        icon={FileText}
      />
      
      <div className="container-amc py-6 sm:py-10">
        <Breadcrumb items={[{ label: "Política de Cambio y Devoluciones" }]} />
      </div>

      <section className="container-amc pb-20">
        <FadeIn>
          <div className="card-base p-6 sm:p-10 max-w-4xl mx-auto prose prose-invert prose-sm sm:prose-base prose-headings:font-display prose-headings:font-bold prose-a:text-gold hover:prose-a:text-amber-400">
            <h3>Introducción</h3>
            <p>
              Esta política establece las condiciones para cambios y devoluciones de productos. Aplica a los productos y servicios adquiridos a través de nuestra tienda online.
            </p>

            <h3>Condiciones para cambios y devoluciones</h3>
            <ul>
              <li><strong>Plazo para solicitar un cambio o devolución:</strong> 7 días después de la compra.</li>
              <li>El producto debe estar sin uso, en su empaque original, con etiquetas y sin daños.</li>
              <li>No son elegibles para cambios o devoluciones: productos personalizados, accesorios destapados, entre otros que se especifiquen.</li>
            </ul>

            <h3>Proceso para solicitar un cambio o devolución</h3>
            <ol>
              <li>Contactar al servicio de atención al cliente a través de ventas@amcsolucionesperu.com o al +51 984 569 125.</li>
              <li>Completar el formulario de solicitud de devolución/cambio.</li>
              <li>Enviar el producto con la documentación requerida: número de pedido, fotos del producto, comprobante de compra.</li>
            </ol>

            <h3>Opciones de reembolso y cambios</h3>
            <ul>
              <li><strong>Modalidades de reembolso:</strong> devolución de dinero, saldo a favor, tarjeta de regalo.</li>
              <li><strong>Tiempo estimado para procesar el reembolso:</strong> 5-10 días hábiles.</li>
              <li><strong>Opciones de cambio:</strong> reemplazo por el mismo producto, otro artículo de igual valor, reembolso parcial.</li>
            </ul>

            <h3>Costos y responsabilidad del envío</h3>
            <ul>
              <li>Los costos de envío en cambios o devoluciones son responsabilidad del cliente, salvo error de la tienda.</li>
              <li>En caso de productos defectuosos o errores en el pedido, el envío será gratuito para el cliente.</li>
            </ul>

            <h3>Excepciones y garantías</h3>
            <ul>
              <li>En casos de productos dañados, defectuosos o errores en el pedido, se aplicará una política especial.</li>
              <li>Algunos productos pueden contar con garantías del fabricante, las cuales deben ser gestionadas directamente con el proveedor.</li>
            </ul>

            <h3>Contacto y Atención al cliente</h3>
            <p>
              En caso de consulta o reclamo, contáctanos al <strong>+51 984 569 125</strong> en nuestros horarios de atención de Lunes a Viernes de 9:00 a 18:00 y Sábados de 9:00 a 13:00.
            </p>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
