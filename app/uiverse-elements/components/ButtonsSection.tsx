'use client';

// Cada botón tiene un data-name que puedes usar para identificarlo
// Ejemplo: "ponme el botón neu-inset-basic" o "usa el botón neu-github-icon"

export default function ButtonsSection() {
    return (
        <section id="buttons" className="kit-section">
            <h2 className="section-title">Buttons Collection (35 elementos de Uiverse.io)</h2>
            <div className="component-grid">

                {/* 1 */}
                <div className="component-wrapper" data-name="neu-inset-basic">
                    <button className="neu-inset-basic">Press me</button>
                    <span className="component-label">neu-inset-basic</span>
                </div>

                {/* 2 */}
                <div className="component-wrapper" data-name="neu-classic">
                    <button className="neu-classic">Button</button>
                    <span className="component-label">neu-classic</span>
                </div>

                {/* 3 */}
                <div className="component-wrapper" data-name="neu-double-layer">
                    <button className="neu-double-layer">
                        <div className="neu-double-layer-inner">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M14.22 21.63c-1.18 0-2.85-.83-4.17-4.8l-.72-2.16-2.16-.72c-3.96-1.32-4.79-2.99-4.79-4.17 0-1.17.83-2.85 4.79-4.18l8.49-2.83c2.12-.71 3.89-.5 4.98.58s1.3 2.86.59 4.98l-2.83 8.49c-1.33 3.98-3 4.81-4.18 4.81z"/>
                            </svg>
                            <span>Send</span>
                        </div>
                    </button>
                    <span className="component-label">neu-double-layer</span>
                </div>

                {/* 4 */}
                <div className="component-wrapper" data-name="neu-explore">
                    <button className="neu-explore">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        Explore me
                    </button>
                    <span className="component-label">neu-explore</span>
                </div>

                {/* 5 */}
                <div className="component-wrapper" data-name="neu-github-icon">
                    <button className="neu-github-icon">
                        <svg width="28" height="28" fill="#0092E4" viewBox="0 0 24 24">
                            <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-github-icon</span>
                </div>

                {/* 6 */}
                <div className="component-wrapper" data-name="neu-register-arrow">
                    <button className="neu-register-arrow">
                        Register Now
                        <div className="neu-register-arrow-inner">
                            <svg viewBox="0 0 32 32" height="20" width="20" fill="white">
                                <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"/>
                            </svg>
                        </div>
                    </button>
                    <span className="component-label">neu-register-arrow</span>
                </div>

                {/* 7 */}
                <div className="component-wrapper" data-name="neu-upload-green">
                    <button className="neu-upload-green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
                            <path d="M9 15l3 -3l3 3"/>
                            <path d="M12 12l0 9"/>
                        </svg>
                        <span>Upload</span>
                    </button>
                    <span className="component-label">neu-upload-green</span>
                </div>

                {/* 8 */}
                <div className="component-wrapper" data-name="neu-blob-hover">
                    <button className="neu-blob-hover">
                        <span className="neu-blob-text">Hover me</span>
                        <span className="neu-blob"></span>
                        <span className="neu-blob"></span>
                        <span className="neu-blob"></span>
                        <span className="neu-blob"></span>
                    </button>
                    <span className="component-label">neu-blob-hover</span>
                </div>

                {/* 9 */}
                <div className="component-wrapper" data-name="neu-send-animated">
                    <button className="neu-send-animated">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.22 21.63c-1.18 0-2.85-.83-4.17-4.8l-.72-2.16-2.16-.72c-3.96-1.32-4.79-2.99-4.79-4.17 0-1.17.83-2.85 4.79-4.18l8.49-2.83c2.12-.71 3.89-.5 4.98.58s1.3 2.86.59 4.98l-2.83 8.49c-1.33 3.98-3 4.81-4.18 4.81z"/>
                        </svg>
                        Send Message
                    </button>
                    <span className="component-label">neu-send-animated</span>
                </div>

                {/* 10 */}
                <div className="component-wrapper" data-name="neu-concave">
                    <button className="neu-concave">Click Me</button>
                    <span className="component-label">neu-concave</span>
                </div>

                {/* 11 */}
                <div className="component-wrapper" data-name="neu-pressed">
                    <button className="neu-pressed">Pressed</button>
                    <span className="component-label">neu-pressed</span>
                </div>

                {/* 12 */}
                <div className="component-wrapper" data-name="neu-pill">
                    <button className="neu-pill">Pill Button</button>
                    <span className="component-label">neu-pill</span>
                </div>

                {/* 13 */}
                <div className="component-wrapper" data-name="neu-heart-icon">
                    <button className="neu-heart-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-heart-icon</span>
                </div>

                {/* 14 */}
                <div className="component-wrapper" data-name="neu-home-icon">
                    <button className="neu-home-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-home-icon</span>
                </div>

                {/* 15 */}
                <div className="component-wrapper" data-name="neu-settings-icon">
                    <button className="neu-settings-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-settings-icon</span>
                </div>

                {/* 16 */}
                <div className="component-wrapper" data-name="neu-fab-plus">
                    <button className="neu-fab-plus">+</button>
                    <span className="component-label">neu-fab-plus</span>
                </div>

                {/* 17 */}
                <div className="component-wrapper dark-bg" data-name="neu-dark-mode">
                    <button className="neu-dark-mode">Dark Mode</button>
                    <span className="component-label" style={{color: '#fff'}}>neu-dark-mode</span>
                </div>

                {/* 18 */}
                <div className="component-wrapper" data-name="neu-glow-gradient">
                    <button className="neu-glow-gradient">Glow Effect</button>
                    <span className="component-label">neu-glow-gradient</span>
                </div>

                {/* 19 */}
                <div className="component-wrapper" data-name="neu-share-circle">
                    <button className="neu-share-circle">
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.75 5.125a3.125 3.125 0 1 1 .754 2.035l-8.397 3.9a3.124 3.124 0 0 1 0 1.88l8.397 3.9a3.125 3.125 0 1 1-.61 1.095l-8.397-3.9a3.125 3.125 0 1 1 0-4.07l8.397-3.9a3.125 3.125 0 0 1-.144-.94Z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-share-circle</span>
                </div>

                {/* 20 */}
                <div className="component-wrapper" data-name="neu-download">
                    <button className="neu-download">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download
                    </button>
                    <span className="component-label">neu-download</span>
                </div>

                {/* 21 */}
                <div className="component-wrapper" data-name="neu-telegram">
                    <button className="neu-telegram">
                        <svg width="18" height="18" fill="white" viewBox="0 0 50 50">
                            <path d="M46.137,6.552c-0.75,-0.636 -1.928,-0.727 -3.146,-0.238h-0.002c-1.281,0.514 -36.261,15.518 -37.685,16.131c-0.259,0.09 -2.521,0.934 -2.288,2.814c0.208,1.695 2.026,2.397 2.248,2.478l8.893,3.045c0.59,1.964 2.765,9.21 3.246,10.758c0.3,0.965 0.789,2.233 1.646,2.494c0.752,0.29 1.5,0.025 1.984,-0.355l5.437,-5.043l8.777,6.845l0.209,0.125c0.596,0.264 1.167,0.396 1.712,0.396c0.421,0 0.825,-0.079 1.211,-0.237c1.315,-0.54 1.841,-1.793 1.896,-1.935l6.556,-34.077c0.4,-1.82 -0.156,-2.746 -0.694,-3.201z"/>
                        </svg>
                        <span>Telegram</span>
                    </button>
                    <span className="component-label">neu-telegram</span>
                </div>

                {/* 22 */}
                <div className="component-wrapper" data-name="neu-play-circle">
                    <button className="neu-play-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-play-circle</span>
                </div>

                {/* 23 */}
                <div className="component-wrapper" data-name="neu-pause-circle">
                    <button className="neu-pause-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-pause-circle</span>
                </div>

                {/* 24 */}
                <div className="component-wrapper" data-name="neu-power-circle">
                    <button className="neu-power-circle">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-power-circle</span>
                </div>

                {/* 25 */}
                <div className="component-wrapper" data-name="neu-nav-arrows">
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="neu-nav-arrow">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </button>
                        <button className="neu-nav-arrow">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </button>
                    </div>
                    <span className="component-label">neu-nav-arrows</span>
                </div>

                {/* 26 */}
                <div className="component-wrapper" data-name="neu-notification-bell">
                    <button className="neu-notification-bell">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <span className="neu-badge">3</span>
                    </button>
                    <span className="component-label">neu-notification-bell</span>
                </div>

                {/* 27 */}
                <div className="component-wrapper" data-name="neu-hamburger-menu">
                    <button className="neu-hamburger-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <span className="component-label">neu-hamburger-menu</span>
                </div>

                {/* 28 */}
                <div className="component-wrapper" data-name="neu-close-x">
                    <button className="neu-close-x">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-close-x</span>
                </div>

                {/* 29 */}
                <div className="component-wrapper" data-name="neu-check-confirm">
                    <button className="neu-check-confirm">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-check-confirm</span>
                </div>

                {/* 30 */}
                <div className="component-wrapper" data-name="neu-search-circle">
                    <button className="neu-search-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </button>
                    <span className="component-label">neu-search-circle</span>
                </div>

                {/* 31 */}
                <div className="component-wrapper" data-name="neu-email-btn">
                    <button className="neu-email-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span>Email</span>
                    </button>
                    <span className="component-label">neu-email-btn</span>
                </div>

                {/* 32 */}
                <div className="component-wrapper" data-name="neu-call-btn">
                    <button className="neu-call-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        <span>Call</span>
                    </button>
                    <span className="component-label">neu-call-btn</span>
                </div>

                {/* 33 */}
                <div className="component-wrapper" data-name="neu-submit-primary">
                    <button className="neu-submit-primary">Submit</button>
                    <span className="component-label">neu-submit-primary</span>
                </div>

                {/* 34 */}
                <div className="component-wrapper" data-name="neu-cancel-danger">
                    <button className="neu-cancel-danger">Cancel</button>
                    <span className="component-label">neu-cancel-danger</span>
                </div>

                {/* 35 */}
                <div className="component-wrapper" data-name="neu-loading-btn">
                    <button className="neu-loading-btn">
                        <span className="neu-spinner"></span>
                        Loading...
                    </button>
                    <span className="component-label">neu-loading-btn</span>
                </div>

            </div>
        </section>
    );
}
