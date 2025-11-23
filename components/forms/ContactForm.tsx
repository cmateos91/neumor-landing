'use client'

import { useState } from 'react'
import { NeumorfButton } from '@/components/ui/NeumorfButton'
import { crearLead } from '@/app/actions/leads'

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo_negocio: '',
    mensaje: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await crearLead(formData)

    if (result.success) {
      setStatus('success')
      setFormData({ nombre: '', email: '', tipo_negocio: '', mensaje: '' })
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Error al enviar el formulario')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-card p-8 text-center">
        <div className="text-emerald-500 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold mb-2">Proyecto recibido</h3>
        <p className="text-sm text-slate-600">
          Te responderemos pronto con una propuesta personalizada.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-slate-500 underline"
        >
          Enviar otro proyecto
        </button>
      </div>
    )
  }

  return (
    <div className="form-card p-8">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full rounded-3xl px-4 py-2.5 text-sm bg-slate-100 outline-none shadow-[inset_4px_4px_10px_rgba(15,23,42,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.95)]"
            placeholder="Cómo te llamas"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-3xl px-4 py-2.5 text-sm bg-slate-100 outline-none shadow-[inset_4px_4px_10px_rgba(15,23,42,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.95)]"
            placeholder="donde podamos escribirte"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Tipo de negocio
          </label>
          <input
            type="text"
            name="tipo_negocio"
            value={formData.tipo_negocio}
            onChange={handleChange}
            required
            className="w-full rounded-3xl px-4 py-2.5 text-sm bg-slate-100 outline-none shadow-[inset_4px_4px_10px_rgba(15,23,42,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.95)]"
            placeholder="restaurante, marca personal, estudio, etc."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            ¿Qué te gustaría conseguir con la web?
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-3xl px-4 py-2.5 text-sm bg-slate-100 outline-none resize-none shadow-[inset_4px_4px_10px_rgba(15,23,42,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.95)]"
            placeholder="Cuéntame en pocas frases qué buscas."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        )}

        <NeumorfButton
          type="submit"
          className="w-full justify-center"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar proyecto a revisión'}
        </NeumorfButton>
      </form>
    </div>
  )
}
