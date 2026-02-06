'use client'

import { useState } from 'react'
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
      <div className="ng-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full
                      bg-emerald-500/10 dark:bg-emerald-500/20
                      flex items-center justify-center">
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
          className="ng-raised mt-6 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
        >
          Enviar otro proyecto
        </button>
      </div>
    )
  }

  return (
    <div className="ng-card p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ml-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="ng-input"
            placeholder="¿Cómo te llamas?"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ml-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="ng-input"
            placeholder="donde podamos escribirte"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ml-1">
            Tipo de negocio
          </label>
          <input
            type="text"
            name="tipo_negocio"
            value={formData.tipo_negocio}
            onChange={handleChange}
            required
            className="ng-input"
            placeholder="restaurante, marca personal, estudio..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ml-1">
            ¿Qué te gustaría conseguir?
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            className="ng-input resize-none"
            placeholder="Cuéntame en pocas frases qué buscas..."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm px-1">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="ng-btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar proyecto a revisión'}
        </button>
      </form>
    </div>
  )
}
