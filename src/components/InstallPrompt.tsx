import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

function PlusSquareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
}

function isInStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (isInStandaloneMode()) {
      setInstalled(true)
      return
    }

    const dismissed = localStorage.getItem('ephpha-pwa-dismissed')
    if (dismissed) {
      const ts = parseInt(dismissed)
      if (Date.now() - ts < 7 * 24 * 60 * 60 * 1000) {
        setDismissed(true)
        return
      }
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)

    const installedHandler = () => setInstalled(true)
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  if (installed || dismissed) return null

  const canInstallNative = !!deferredPrompt
  const isiOS = isIOS()

  if (!canInstallNative && !isiOS) return null

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('ephpha-pwa-dismissed', Date.now().toString())
    setDismissed(true)
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-6">
      <div style={{
        background: 'white',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/apple-touch-icon.png"
              alt=""
              width={52}
              height={52}
              style={{
                width: '52px', height: '52px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(220, 38, 38, 0.28), inset 0 0 0 0.5px rgba(255,255,255,0.18)',
                flexShrink: 0,
              }}
            />
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 750, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.3 }}>
                Install Ephpha
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0, marginTop: '2px', lineHeight: 1.4 }}>
                Add to your home screen for instant access
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            style={{
              background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
              padding: '4px', fontSize: '20px', lineHeight: 1, opacity: 0.6,
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[
            'Works offline — write emails anywhere',
            'Full-screen, no browser bar',
            'Lightning-fast launch from home screen',
          ].map(text => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'rgba(220, 38, 38, 0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--brand)',
              }}>
                <CheckIcon />
              </div>
              <span style={{ fontSize: '14px', color: 'var(--ink-soft)', fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Install action */}
        {canInstallNative ? (
          <button
            onClick={handleInstall}
            style={{
              width: '100%', padding: '13px 20px',
              background: 'linear-gradient(135deg, #dc2626, #ea580c)',
              color: 'white', border: 'none', borderRadius: 'var(--r-xl)',
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: 'var(--shadow-brand)',
              letterSpacing: '-0.01em',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <DownloadIcon />
            Install Ephpha App
          </button>
        ) : isiOS ? (
          <>
            <button
              onClick={() => setShowIOSGuide(!showIOSGuide)}
              style={{
                width: '100%', padding: '13px 20px',
                background: 'linear-gradient(135deg, #dc2626, #ea580c)',
                color: 'white', border: 'none', borderRadius: 'var(--r-xl)',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: 'var(--shadow-brand)',
                letterSpacing: '-0.01em',
              }}
            >
              <DownloadIcon />
              Add to Home Screen
            </button>

            {showIOSGuide && (
              <div style={{
                marginTop: '16px', padding: '18px',
                background: 'var(--canvas)', borderRadius: 'var(--r-md)',
                border: '1px solid var(--line)',
              }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                  How to install on iOS:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { icon: <ShareIcon />, text: <>Tap the <strong>Share</strong> button in Safari's toolbar</> },
                    { icon: <PlusSquareIcon />, text: <>Scroll down and tap <strong>"Add to Home Screen"</strong></> },
                    { icon: <CheckIcon />, text: <>Tap <strong>"Add"</strong> — that's it!</> },
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'white', border: '1px solid var(--line)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        color: 'var(--brand)',
                      }}>
                        {step.icon}
                      </div>
                      <span style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.4 }}>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  )
}
