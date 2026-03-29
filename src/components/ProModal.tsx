import { useState } from 'react'

interface ProModalProps {
  onClose: () => void
}

export default function ProModal({ onClose }: ProModalProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'origin' | 'pro'>('about')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex gap-4 border-b border-stone-200 mb-6">
          <button 
            onClick={() => setActiveTab('about')}
            className={`pb-2 font-semibold transition-colors ${activeTab === 'about' ? 'border-b-2 border-red-500 text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            About Ephpha
          </button>
          <button 
            onClick={() => setActiveTab('origin')}
            className={`pb-2 font-semibold transition-colors ${activeTab === 'origin' ? 'border-b-2 border-red-500 text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Origin & Meaning
          </button>
          <button 
            onClick={() => setActiveTab('pro')}
            className={`pb-2 font-semibold transition-colors ${activeTab === 'pro' ? 'border-b-2 border-red-500 text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Pro Plan
          </button>
        </div>
