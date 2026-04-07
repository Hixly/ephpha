export default function ExtensionPromo() {
  return (
    <div style={{
      margin: '24px 16px 0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      background: '#fff',
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: '0 2px 12px rgba(234,88,12,0.08)',
      border: '1.5px solid rgba(234,88,12,0.18)',
    }}>
      {/* Chrome icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7.5" fill="white" stroke="#e5e7eb"/>
          <circle cx="8" cy="8" r="3.2" fill="#4285F4"/>
          {/* Chrome color ring segments */}
          <path d="M8 4.5 A3.5 3.5 0 0 1 11.03 6H14.9A7 7 0 0 0 8 1.5Z" fill="#EA4335"/>
          <path d="M14.9 6H11.03A3.5 3.5 0 0 1 9.75 11.06L7.82 14.47A7 7 0 0 0 14.9 6Z" fill="#FBBC05"/>
          <path d="M7.82 14.47L9.75 11.06A3.5 3.5 0 0 1 4.97 6H1.1A7 7 0 0 0 7.82 14.47Z" fill="#34A853"/>
          <path d="M1.1 6H4.97A3.5 3.5 0 0 1 8 4.5V1.5A7 7 0 0 0 1.1 6Z" fill="#EA4335"/>
          <circle cx="8" cy="8" r="2.5" fill="#4285F4"/>
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#ea580c', textTransform: 'uppercase' }}>
          Chrome Extension
        </span>
      </div>

      <p style={{ fontWeight: 800, fontSize: '17px', color: '#1f2937', margin: '0 0 4px', lineHeight: 1.3 }}>
        Use Ephpha inside Gmail
      </p>
      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
        Install the free Chrome extension and access all four Ephpha tools right inside your browser — next to any email you're writing.
      </p>

      {/* Inline SVG mockup */}
      <div style={{ marginBottom: '16px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #f3f4f6', background: '#f9fafb' }}>
        <svg viewBox="0 0 500 140" width="100%" height="auto" aria-label="Ephpha extension panel next to Gmail" role="img">
          {/* Gmail-style email area */}
          <rect width="500" height="140" fill="#f9fafb"/>
          {/* Gmail left pane */}
          <rect x="0" y="0" width="310" height="140" fill="#fff"/>
          <rect x="12" y="12" width="80" height="8" rx="4" fill="#e5e7eb"/>
          <rect x="12" y="28" width="280" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="12" y="40" width="240" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="12" y="52" width="260" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="12" y="64" width="220" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="12" y="76" width="200" height="6" rx="3" fill="#f3f4f6"/>
          {/* Divider */}
          <rect x="310" y="0" width="1" height="140" fill="#e5e7eb"/>
          {/* Extension side panel */}
          <rect x="311" y="0" width="189" height="140" fill="#fff9f6"/>
          {/* Extension header */}
          <rect x="311" y="0" width="189" height="36" fill="#fff"/>
          <rect x="311" y="36" width="189" height="1" fill="#fee2e2"/>
          {/* Logo + brand */}
          <rect x="320" y="10" width="16" height="16" rx="8" fill="#dc2626"/>
          <rect x="341" y="13" width="40" height="6" rx="3" fill="#1f2937"/>
          {/* Tab pills */}
          <rect x="318" y="44" width="40" height="14" rx="7" fill="#1f2937"/>
          <rect x="363" y="44" width="38" height="14" rx="7" fill="#f3f4f6"/>
          <rect x="406" y="44" width="36" height="14" rx="7" fill="#f3f4f6"/>
          <rect x="320" y="48" width="36" height="6" rx="3" fill="#fff"/>
          {/* Content area */}
          <rect x="318" y="66" width="170" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="318" y="78" width="150" height="6" rx="3" fill="#f3f4f6"/>
          <rect x="318" y="90" width="160" height="6" rx="3" fill="#f3f4f6"/>
          {/* Generate button */}
          <rect x="318" y="108" width="170" height="22" rx="11" fill="#dc2626"/>
          <rect x="340" y="115" width="80" height="8" rx="4" fill="#fff" opacity="0.8"/>
        </svg>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <a
          href="/ephpha-extension.zip"
          download="ephpha-extension.zip"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(to right, #ea580c, #dc2626)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
          }}
        >
          ⬇ Download Extension
        </a>
        <a
          href="#"
          title="Coming soon to Chrome Web Store"
          onClick={e => e.preventDefault()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '999px',
            border: '1.5px solid #ea580c',
            color: '#ea580c',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
            opacity: 0.7,
            cursor: 'not-allowed',
          }}
        >
          View on Chrome Web Store
        </a>
      </div>

      {/* Install helper text */}
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
        After downloading: unzip the file → open <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '1px 4px', borderRadius: '4px', fontSize: '11px' }}>chrome://extensions</code> → enable Developer mode → click Load unpacked → select the folder
      </p>
    </div>
  )
}
