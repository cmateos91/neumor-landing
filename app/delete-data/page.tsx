import { Navbar } from "@/components/ui/Navbar";
import { NeumorfSection } from "@/components/ui/NeumorfSection";
import { NeumorfCard } from "@/components/ui/NeumorfCard";

export default function DeleteDataPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-[var(--background)]">
        <NeumorfSection>
          <NeumorfCard className="max-w-3xl mx-auto space-y-6 text-slate-800 dark:text-slate-200 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Eliminación de datos – NeumorStudio
            </h1>

            <p>
              En <strong>NeumorStudio</strong> respetamos tu privacidad y te ofrecemos
              control total sobre tus datos. Esta página explica cómo puedes solicitar
              la eliminación de la información asociada a tu cuenta cuando utilizas
              nuestras integraciones con <strong>Facebook</strong> e{" "}
              <strong>Instagram</strong>.
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-3 mt-6">
                ¿Qué datos podemos almacenar?
              </h2>
              <p className="mb-2">Solo almacenamos la información estrictamente necesaria:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>ID de usuario de Meta y página conectada.</li>
                <li>Nombre público y foto de perfil (si fueron autorizados).</li>
                <li>Tokens de acceso necesarios para que las automatizaciones funcionen.</li>
                <li>
                  Datos técnicos mínimos relacionados con estadísticas o mensajes, cuando
                  proceda.
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                No almacenamos contraseñas ni datos sensibles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 mt-6">
                Formas de solicitar la eliminación de tus datos
              </h2>
              <p>Puedes pedir la eliminación de tus datos de cualquiera de estas formas:</p>

              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Solicitud por correo electrónico</h3>
                  <p>
                    Envíanos un correo a:{" "}
                    <a 
                      href="mailto:soporte@neumorstudio.com" 
                      className="font-bold underline"
                    >
                      soporte@neumorstudio.com
                    </a>
                    <br />
                    Asunto recomendado: <span className="font-semibold">“Eliminar mis datos”</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Solicitud a través del formulario de contacto</h3>
                  <p>
                    También puedes escribirnos desde nuestro formulario de contacto en:{" "}
                    <a 
                      href="https://www.neumorstudio.com/contact" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline break-all"
                    >
                      https://www.neumorstudio.com/contact
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Revocando permisos desde Facebook/Instagram</h3>
                  <p className="mb-2">Puedes revocar el acceso de nuestra app directamente desde tu cuenta de Meta:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Ve a <strong>Configuración &gt; Seguridad &gt; Apps y sitios web</strong>.</li>
                    <li>Busca <strong>NeumorStudioApp</strong> o el nombre de nuestra aplicación.</li>
                    <li>Selecciona <strong>Eliminar</strong> o <strong>Revocar acceso</strong>.</li>
                  </ul>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Cuando revocas los permisos, nuestros sistemas dejan de poder acceder a tus datos
                    y se eliminan los tokens asociados en nuestros servidores.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 mt-6">Plazo de eliminación</h2>
              <p>
                Una vez recibida tu solicitud (por correo, formulario o revocación), procederemos a
                eliminar los datos asociados en un plazo máximo de <strong>48 horas</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 mt-6">
                Confirmación de eliminación
              </h2>
              <p>
                Cuando hayamos completado el proceso, te enviaremos un correo de confirmación
                indicando que tus datos han sido eliminados de NeumorStudio.
              </p>
            </div>

            <footer className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
              Última actualización: <strong>2025</strong> – NeumorStudio
            </footer>
          </NeumorfCard>
        </NeumorfSection>
      </main>
    </>
  );
}