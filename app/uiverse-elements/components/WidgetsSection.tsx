'use client';

// Cada widget tiene un data-name que puedes usar para identificarlo
// Ejemplo: "ponme el loader neu-loader-gradient" o "usa el tooltip neu-tooltip-flip"

export default function WidgetsSection() {
    return (
        <section id="widgets" className="kit-section">
            <h2 className="section-title">Widgets Collection (19 elementos de Uiverse.io)</h2>
            <div className="component-grid">

                {/* LOADERS */}

                {/* 1 */}
                <div className="component-wrapper" data-name="neu-loader-gradient">
                    <div className="neu-loader-gradient">
                        <span></span>
                    </div>
                    <span className="component-label">neu-loader-gradient</span>
                </div>

                {/* 2 */}
                <div className="component-wrapper" data-name="neu-loader-cube">
                    <div className="neu-loader-cube-wrapper">
                        <div className="neu-loader-cube">
                            <div className="face front"></div>
                            <div className="face back"></div>
                            <div className="face left"></div>
                            <div className="face right"></div>
                            <div className="face top"></div>
                            <div className="face bottom"></div>
                        </div>
                    </div>
                    <span className="component-label">neu-loader-cube</span>
                </div>

                {/* 3 */}
                <div className="component-wrapper" data-name="neu-loader-dots">
                    <div className="neu-loader-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className="component-label">neu-loader-dots</span>
                </div>

                {/* 4 */}
                <div className="component-wrapper" data-name="neu-loader-pulse">
                    <div className="neu-loader-pulse"></div>
                    <span className="component-label">neu-loader-pulse</span>
                </div>

                {/* 5 */}
                <div className="component-wrapper" data-name="neu-loader-spinner">
                    <div className="neu-loader-spinner"></div>
                    <span className="component-label">neu-loader-spinner</span>
                </div>

                {/* 6 */}
                <div className="component-wrapper" data-name="neu-loader-ring">
                    <div className="neu-loader-ring">
                        <div className="ring-inner"></div>
                    </div>
                    <span className="component-label">neu-loader-ring</span>
                </div>

                {/* 7 */}
                <div className="component-wrapper" data-name="neu-loader-bars">
                    <div className="neu-loader-bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <span className="component-label">neu-loader-bars</span>
                </div>

                {/* 8 */}
                <div className="component-wrapper" data-name="neu-loader-bounce">
                    <div className="neu-loader-bounce">
                        <div className="ball"></div>
                        <div className="ball"></div>
                        <div className="ball"></div>
                    </div>
                    <span className="component-label">neu-loader-bounce</span>
                </div>

                {/* 9 */}
                <div className="component-wrapper dark-bg" data-name="neu-loader-glow">
                    <div className="neu-loader-glow"></div>
                    <span className="component-label" style={{color: '#fff'}}>neu-loader-glow</span>
                </div>

                {/* 10 */}
                <div className="component-wrapper" data-name="neu-loader-text">
                    <div className="neu-loader-text">Loading...</div>
                    <span className="component-label">neu-loader-text</span>
                </div>

                {/* 11 */}
                <div className="component-wrapper" data-name="neu-loader-pacman">
                    <div className="neu-loader-pacman"></div>
                    <span className="component-label">neu-loader-pacman</span>
                </div>

                {/* 12 */}
                <div className="component-wrapper" data-name="neu-loader-wave">
                    <div className="neu-loader-wave">
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                    </div>
                    <span className="component-label">neu-loader-wave</span>
                </div>

                {/* 13 */}
                <div className="component-wrapper" data-name="neu-loader-orbit">
                    <div className="neu-loader-orbit">
                        <div className="orbit-dot"></div>
                    </div>
                    <span className="component-label">neu-loader-orbit</span>
                </div>

                {/* 14 */}
                <div className="component-wrapper" data-name="neu-loader-squares">
                    <div className="neu-loader-squares">
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                        <div className="square"></div>
                    </div>
                    <span className="component-label">neu-loader-squares</span>
                </div>

                {/* 15 */}
                <div className="component-wrapper" data-name="neu-loader-clock">
                    <div className="neu-loader-clock">
                        <div className="clock-hand"></div>
                    </div>
                    <span className="component-label">neu-loader-clock</span>
                </div>

                {/* 16 */}
                <div className="component-wrapper" data-name="neu-loader-circle">
                    <div className="neu-loader-circle"></div>
                    <span className="component-label">neu-loader-circle</span>
                </div>

                {/* TOOLTIPS */}

                {/* 17 */}
                <div className="component-wrapper" data-name="neu-tooltip-simple">
                    <div className="neu-tooltip-simple">
                        <span className="tooltip-text">Tooltip text</span>
                        <button className="tooltip-trigger">Hover me</button>
                    </div>
                    <span className="component-label">neu-tooltip-simple</span>
                </div>

                {/* 18 */}
                <div className="component-wrapper" data-name="neu-tooltip-flip">
                    <div className="neu-tooltip-flip">
                        <span className="tooltip-flip-text">Uiverse.io</span>
                        <span className="tooltip-flip-trigger">@</span>
                    </div>
                    <span className="component-label">neu-tooltip-flip</span>
                </div>

                {/* 19 */}
                <div className="component-wrapper dark-bg" data-name="neu-tooltip-profile">
                    <div className="neu-tooltip-profile">
                        <div className="profile-tooltip">
                            <div className="profile-content">
                                <div className="profile-avatar">U</div>
                                <div className="profile-info">
                                    <div className="profile-name">User</div>
                                    <div className="profile-username">@username</div>
                                </div>
                            </div>
                            <div className="profile-stats">500+ Connections</div>
                        </div>
                        <div className="profile-trigger">
                            <svg viewBox="0 0 448 512" height="24" fill="#1da1f2">
                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                            </svg>
                        </div>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-tooltip-profile</span>
                </div>

            </div>
        </section>
    );
}
