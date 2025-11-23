export function Hero3DVideo() {
  return (
    <section
      className="
        w-full max-w-5xl mx-auto
        px-4 md:px-6
        pt-16 pb-10
        flex flex-col md:flex-row items-center gap-10
      "
    >
      {/* Columna texto */}
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs md:text-sm badge-pill">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Estudio de interfaces neumórficas + automatización</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-[#1A1A1A] dark:text-[#E5E7EB]">
          Neumor Studio: interfaces suaves, futuristas
          <span className="block text-[color:#1F8AFB] dark:text-[color:#3B82F6]">
            y sistemas que trabajan por ti.
          </span>
        </h1>

        <p className="text-sm md:text-base text-[#6B7280] dark:text-[#A7B0BC] max-w-xl">
          Webs en estilo neumorfismo, captación de leads y automatizaciones
          con chatbots, todo pensado para verse elegante en cualquier dispositivo.
        </p>
      </div>

      {/* Columna vídeo 3D */}
      <div className="flex-1 flex items-center justify-center">
        <div className="hero-3d-shell">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-3d-video"
          >
            <source src="/videos/black.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
