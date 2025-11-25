'use client';

// Cada control tiene un data-name que puedes usar para identificarlo
// Ejemplo: "ponme el toggle neu-toggle-pill" o "usa el checkbox neu-checkbox-round"

export default function ControlsSection() {
    return (
        <section id="controls" className="kit-section">
            <h2 className="section-title">Controls Collection (19 elementos de Uiverse.io)</h2>
            <div className="component-grid">

                {/* TOGGLES/SWITCHES */}

                {/* 1 */}
                <div className="component-wrapper" data-name="neu-toggle-pill">
                    <label className="neu-toggle-pill">
                        <input type="checkbox" />
                        <span className="neu-toggle-pill-slider"></span>
                    </label>
                    <span className="component-label">neu-toggle-pill</span>
                </div>

                {/* 2 */}
                <div className="component-wrapper" data-name="neu-toggle-classic">
                    <label className="neu-toggle-classic">
                        <input type="checkbox" className="neu-toggle-classic-input" />
                        <div className="neu-toggle-classic-indicator"></div>
                    </label>
                    <span className="component-label">neu-toggle-classic</span>
                </div>

                {/* 3 */}
                <div className="component-wrapper dark-bg" data-name="neu-toggle-dark">
                    <label className="neu-toggle-dark">
                        <input type="checkbox" />
                        <span className="neu-toggle-dark-slider"></span>
                    </label>
                    <span className="component-label" style={{color: '#fff'}}>neu-toggle-dark</span>
                </div>

                {/* 4 */}
                <div className="component-wrapper" data-name="neu-toggle-ios">
                    <label className="neu-toggle-ios">
                        <input type="checkbox" defaultChecked />
                        <span className="neu-toggle-ios-slider"></span>
                    </label>
                    <span className="component-label">neu-toggle-ios</span>
                </div>

                {/* 5 */}
                <div className="component-wrapper" data-name="neu-toggle-line">
                    <label className="neu-toggle-line">
                        <input type="checkbox" />
                        <span className="neu-toggle-line-slider"></span>
                    </label>
                    <span className="component-label">neu-toggle-line</span>
                </div>

                {/* 6 */}
                <div className="component-wrapper dark-bg" data-name="neu-toggle-glow">
                    <label className="neu-toggle-glow">
                        <input type="checkbox" defaultChecked />
                        <span className="neu-toggle-glow-slider"></span>
                    </label>
                    <span className="component-label" style={{color: '#fff'}}>neu-toggle-glow</span>
                </div>

                {/* 7 */}
                <div className="component-wrapper" data-name="neu-toggle-square">
                    <label className="neu-toggle-square">
                        <input type="checkbox" />
                        <span className="neu-toggle-square-slider"></span>
                    </label>
                    <span className="component-label">neu-toggle-square</span>
                </div>

                {/* 8 */}
                <div className="component-wrapper" data-name="neu-toggle-sun-moon">
                    <label className="neu-toggle-sun-moon">
                        <input type="checkbox" />
                        <span className="neu-toggle-sun-moon-slider"></span>
                    </label>
                    <span className="component-label">neu-toggle-sun-moon</span>
                </div>

                {/* CHECKBOXES */}

                {/* 9 */}
                <div className="component-wrapper" data-name="neu-checkbox-round">
                    <label className="neu-checkbox-round">
                        <input type="checkbox" defaultChecked />
                        <div className="neu-checkbox-round-mark"></div>
                    </label>
                    <span className="component-label">neu-checkbox-round</span>
                </div>

                {/* 10 */}
                <div className="component-wrapper" data-name="neu-checkbox-green">
                    <label className="neu-checkbox-green">
                        <span className="neu-checkbox-green-label">Accept</span>
                        <input type="checkbox" defaultChecked />
                        <span className="neu-checkbox-green-mark"></span>
                    </label>
                    <span className="component-label">neu-checkbox-green</span>
                </div>

                {/* 11 */}
                <div className="component-wrapper dark-bg" data-name="neu-checkbox-dark">
                    <label className="neu-checkbox-dark">
                        <input type="checkbox" />
                        <span className="neu-checkbox-dark-mark"></span>
                    </label>
                    <span className="component-label" style={{color: '#fff'}}>neu-checkbox-dark</span>
                </div>

                {/* 12 */}
                <div className="component-wrapper" data-name="neu-checkbox-soft">
                    <label className="neu-checkbox-soft">
                        <input type="checkbox" defaultChecked />
                        <span className="neu-checkbox-soft-mark"></span>
                        <span className="neu-checkbox-soft-text">Option</span>
                    </label>
                    <span className="component-label">neu-checkbox-soft</span>
                </div>

                {/* 13 */}
                <div className="component-wrapper" data-name="neu-checkbox-bounce">
                    <label className="neu-checkbox-bounce">
                        <input type="checkbox" />
                        <span className="neu-checkbox-bounce-mark"></span>
                    </label>
                    <span className="component-label">neu-checkbox-bounce</span>
                </div>

                {/* 14 */}
                <div className="component-wrapper" data-name="neu-checkbox-scale">
                    <label className="neu-checkbox-scale">
                        <input type="checkbox" defaultChecked />
                        <span className="neu-checkbox-scale-mark"></span>
                    </label>
                    <span className="component-label">neu-checkbox-scale</span>
                </div>

                {/* RADIO BUTTONS */}

                {/* 15 */}
                <div className="component-wrapper" data-name="neu-radio-classic">
                    <div className="neu-radio-classic-group">
                        <label className="neu-radio-classic">
                            <input type="radio" name="neu-radio-demo-1" defaultChecked />
                            <span className="neu-radio-classic-mark"></span>
                            <span className="neu-radio-classic-text">Option A</span>
                        </label>
                        <label className="neu-radio-classic">
                            <input type="radio" name="neu-radio-demo-1" />
                            <span className="neu-radio-classic-mark"></span>
                            <span className="neu-radio-classic-text">Option B</span>
                        </label>
                    </div>
                    <span className="component-label">neu-radio-classic</span>
                </div>

                {/* 16 */}
                <div className="component-wrapper dark-bg" data-name="neu-radio-cross">
                    <div className="neu-radio-cross-group">
                        <label className="neu-radio-cross">
                            <input type="radio" name="neu-radio-demo-2" defaultChecked />
                            <span className="neu-radio-cross-mark">
                                <span className="neu-radio-cross-plus"></span>
                            </span>
                        </label>
                        <label className="neu-radio-cross">
                            <input type="radio" name="neu-radio-demo-2" />
                            <span className="neu-radio-cross-mark">
                                <span className="neu-radio-cross-plus"></span>
                            </span>
                        </label>
                        <label className="neu-radio-cross">
                            <input type="radio" name="neu-radio-demo-2" />
                            <span className="neu-radio-cross-mark">
                                <span className="neu-radio-cross-plus"></span>
                            </span>
                        </label>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-radio-cross</span>
                </div>

                {/* 17 */}
                <div className="component-wrapper" data-name="neu-radio-card">
                    <div className="neu-radio-card-group">
                        <label className="neu-radio-card">
                            <input type="radio" name="neu-radio-demo-3" defaultChecked />
                            <span className="neu-radio-card-content">
                                <span className="neu-radio-card-icon">A</span>
                            </span>
                        </label>
                        <label className="neu-radio-card">
                            <input type="radio" name="neu-radio-demo-3" />
                            <span className="neu-radio-card-content">
                                <span className="neu-radio-card-icon">B</span>
                            </span>
                        </label>
                    </div>
                    <span className="component-label">neu-radio-card</span>
                </div>

                {/* 18 */}
                <div className="component-wrapper" data-name="neu-radio-pill">
                    <div className="neu-radio-pill-group">
                        <label className="neu-radio-pill">
                            <input type="radio" name="neu-radio-demo-4" defaultChecked />
                            <span className="neu-radio-pill-text">Yes</span>
                        </label>
                        <label className="neu-radio-pill">
                            <input type="radio" name="neu-radio-demo-4" />
                            <span className="neu-radio-pill-text">No</span>
                        </label>
                    </div>
                    <span className="component-label">neu-radio-pill</span>
                </div>

                {/* 19 */}
                <div className="component-wrapper dark-bg" data-name="neu-radio-glow">
                    <div className="neu-radio-glow-group">
                        <label className="neu-radio-glow">
                            <input type="radio" name="neu-radio-demo-5" defaultChecked />
                            <span className="neu-radio-glow-mark"></span>
                        </label>
                        <label className="neu-radio-glow">
                            <input type="radio" name="neu-radio-demo-5" />
                            <span className="neu-radio-glow-mark"></span>
                        </label>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-radio-glow</span>
                </div>

            </div>
        </section>
    );
}
