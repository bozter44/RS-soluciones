import { useMemo, useState } from 'react';

const products = [
  {
    id: 'combo-4-hd-dvr',
    name: 'Combo 4 Cámaras HD + DVR',
    price: '$150.000',
    description:
      'Incluye DVR 4 canales, visión nocturna, detección de movimiento y acceso remoto desde app.',
    imageUrl:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'combo-8-fullhd-dvr',
    name: 'Combo 8 Cámaras Full HD + DVR',
    price: '$290.000',
    description:
      'Sistema de vigilancia para hogares y negocios con grabación continua y respaldo seguro.',
    imageUrl:
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'camara-ip-exterior-wifi',
    name: 'Cámara IP Exterior Wi-Fi',
    price: '$85.000',
    description:
      'Ideal para exteriores, resistente al agua, con audio bidireccional y alerta en tiempo real.',
    imageUrl:
      'https://images.unsplash.com/photo-1614064548016-0fe6f5ef6f26?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'camara-domo-interior',
    name: 'Cámara Domo Interior 2K',
    price: '$69.900',
    description:
      'Perfecta para monitoreo interior con gran angular y visión nocturna infrarroja.',
    imageUrl:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  }
];

const WHATSAPP_NUMBER = '56912345678';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';

function ProductCard({ product }) {
  const whatsappLink = useMemo(() => {
    const text = encodeURIComponent(
      `Hola RS Soluciones, me interesa el producto: ${product.name} (${product.price}). ¿Me entregan más información?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }, [product.name, product.price]);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-sky-500/40">
      <img className="h-48 w-full object-cover" src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-slate-300">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-sky-400">{product.price}</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-400"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Enviando solicitud...' });

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          source: 'Landing RS Soluciones',
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setStatus({
        type: 'success',
        message: '¡Gracias! Recibimos tus datos y te contactaremos pronto.'
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          'No pudimos enviar tu solicitud en este momento. Escríbenos por WhatsApp y te atendemos al instante.'
      });
    }
  };

  const defaultWhatsappMessage = encodeURIComponent(
    'Hola RS Soluciones, necesito una asesoría sobre cámaras de vigilancia e instalación.'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-lg font-semibold tracking-wide text-white">RS Soluciones</p>
            <p className="text-xs text-slate-400">Seguridad inteligente para tu tranquilidad</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultWhatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Contactar
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-14 md:grid-cols-2 md:items-center md:px-6 md:pt-20">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              Instalación profesional + Soporte postventa
            </span>
            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Protege lo que más quieres con RS Soluciones
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              Expertos en Sistemas de Videovigilancia, Instalación y Configuración de Cámaras y DVR/NVR.
            </p>
            <p className="text-sm text-slate-400 md:text-base">
              Solicita tu evaluación sin costo y recibe una propuesta a medida para hogar, oficina o negocio.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Ver catálogo
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultWhatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-emerald-400/50 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-950/40">
            <h2 className="text-xl font-bold text-white">Atención rápida y especializada</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>✅ Asesoría para elegir cámaras según tus espacios.</li>
              <li>✅ Configuración completa de acceso remoto.</li>
              <li>✅ Equipos con garantía y respaldo técnico.</li>
              <li>✅ Planes para hogares, locales y empresas.</li>
            </ul>
          </div>
        </section>

        <section id="catalogo" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-300">Catálogo</p>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Productos destacados</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 md:px-6">
          <div className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">Pedidos y consultas</p>
              <h2 className="text-2xl font-bold text-white">Cuéntanos qué necesitas</h2>
              <p className="text-sm text-slate-300">
                Completa el formulario y registraremos tu solicitud en Google Sheets para responderte rápidamente.
              </p>
              <p className="text-sm text-slate-400">
                También puedes contactarnos directo por WhatsApp para una respuesta inmediata.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultWhatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
              >
                Abrir WhatsApp
              </a>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1 block text-sm text-slate-300">Nombre</span>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-slate-300">Teléfono</span>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="+56 9 0000 0000"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-slate-300">Email (opcional)</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-slate-300">Mensaje</span>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="Ej: Necesito un combo de 4 cámaras para local comercial"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
              </button>

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === 'success'
                      ? 'text-emerald-300'
                      : status.type === 'error'
                        ? 'text-rose-300'
                        : 'text-slate-300'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
