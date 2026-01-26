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
        <div className="w-16 h-16 mx-auto mb-4 rounded-full
                      bg-emerald-500/10 dark:bg-emerald-500/20
                      flex items-center justify-center
                      shadow-[0_4px_16px_rgba(16,185,129,0.2)]">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">Proyecto recibido</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Te responderemos pronto con una propuesta personalizada.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="glass-pill mt-4 px-4 py-2 text-sm text-slate-600 dark:text-slate-300"
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
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="neumor-input w-full px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            placeholder="Cómo te llamas"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="neumor-input w-full px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            placeholder="donde podamos escribirte"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Tipo de negocio
          </label>
          <input
            type="text"
            name="tipo_negocio"
            value={formData.tipo_negocio}
            onChange={handleChange}
            required
            className="neumor-input w-full px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            placeholder="restaurante, marca personal, estudio, etc."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            ¿Qué te gustaría conseguir con la web?
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            className="neumor-input w-full px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
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
