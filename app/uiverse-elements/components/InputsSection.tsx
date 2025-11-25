'use client';

// Cada input/form tiene un data-name que puedes usar para identificarlo
// Ejemplo: "ponme el input neu-input-simple" o "usa el form neu-form-dark-login"

export default function InputsSection() {
    return (
        <section id="inputs" className="kit-section">
            <h2 className="section-title">Inputs & Forms Collection (16 elementos de Uiverse.io)</h2>
            <div className="component-grid">

                {/* 1 */}
                <div className="component-wrapper" data-name="neu-input-simple">
                    <input type="text" className="neu-input-simple" placeholder="Type here..." />
                    <span className="component-label">neu-input-simple</span>
                </div>

                {/* 2 */}
                <div className="component-wrapper" data-name="neu-input-round">
                    <input type="text" className="neu-input-round" placeholder="Username" />
                    <span className="component-label">neu-input-round</span>
                </div>

                {/* 3 */}
                <div className="component-wrapper" data-name="neu-input-inset">
                    <input type="text" className="neu-input-inset" placeholder="First name" />
                    <span className="component-label">neu-input-inset</span>
                </div>

                {/* 4 */}
                <div className="component-wrapper" data-name="neu-input-soft">
                    <input type="text" className="neu-input-soft" placeholder="Type here!" />
                    <span className="component-label">neu-input-soft</span>
                </div>

                {/* 5 */}
                <div className="component-wrapper" data-name="neu-input-focus-scale">
                    <input type="text" className="neu-input-focus-scale" placeholder="Username" />
                    <span className="component-label">neu-input-focus-scale</span>
                </div>

                {/* 6 - Dark Input with Floating Label */}
                <div className="component-wrapper dark-bg" data-name="neu-input-dark-float">
                    <div className="neu-input-dark-float-container">
                        <input type="text" className="neu-input-dark-float" required />
                        <label className="neu-input-dark-float-label">Username</label>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-input-dark-float</span>
                </div>

                {/* 7 - Dark Pill Input */}
                <div className="component-wrapper dark-bg" data-name="neu-input-dark-pill">
                    <input type="text" className="neu-input-dark-pill" placeholder="Username" />
                    <span className="component-label" style={{color: '#fff'}}>neu-input-dark-pill</span>
                </div>

                {/* 8 - Material Dark Search */}
                <div className="component-wrapper dark-bg" data-name="neu-input-dark-search">
                    <input type="text" className="neu-input-dark-search" placeholder="Type something" />
                    <span className="component-label" style={{color: '#fff'}}>neu-input-dark-search</span>
                </div>

                {/* 9 - OTP Inputs */}
                <div className="component-wrapper" data-name="neu-otp-inputs" style={{ gridColumn: 'span 2' }}>
                    <div className="neu-otp-container">
                        <input type="password" className="neu-otp-box" maxLength={1} />
                        <input type="password" className="neu-otp-box" maxLength={1} />
                        <input type="password" className="neu-otp-box" maxLength={1} />
                        <input type="password" className="neu-otp-box" maxLength={1} />
                    </div>
                    <span className="component-label">neu-otp-inputs</span>
                </div>

                {/* 10 - Dark Login Form */}
                <div className="component-wrapper" data-name="neu-form-dark-login" style={{ gridColumn: 'span 2' }}>
                    <form className="neu-form-dark-login">
                        <p className="neu-form-dark-login-heading">Login</p>
                        <div className="neu-form-dark-login-field">
                            <svg className="neu-form-dark-login-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643z"/>
                            </svg>
                            <input autoComplete="off" placeholder="Username" className="neu-form-dark-login-input" type="text" />
                        </div>
                        <div className="neu-form-dark-login-field">
                            <svg className="neu-form-dark-login-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            <input placeholder="Password" className="neu-form-dark-login-input" type="password" />
                        </div>
                        <div className="neu-form-dark-login-btns">
                            <button type="button" className="neu-form-dark-login-btn1">Login</button>
                            <button type="button" className="neu-form-dark-login-btn2">Sign Up</button>
                        </div>
                        <button type="button" className="neu-form-dark-login-btn3">Forgot Password</button>
                    </form>
                    <span className="component-label">neu-form-dark-login</span>
                </div>

                {/* 11 - Light Login Form */}
                <div className="component-wrapper" data-name="neu-form-light-login">
                    <form className="neu-form-light-login">
                        <p className="neu-form-light-heading">Login</p>
                        <input className="neu-form-light-input" placeholder="Username" type="text" />
                        <input className="neu-form-light-input" placeholder="Password" type="password" />
                        <button type="button" className="neu-form-light-btn">Submit</button>
                    </form>
                    <span className="component-label">neu-form-light-login</span>
                </div>

                {/* 12 - Neumorphic Light Form */}
                <div className="component-wrapper" data-name="neu-form-soft-login">
                    <div className="neu-form-soft-login">
                        <div className="neu-form-soft-text">Login</div>
                        <div className="neu-form-soft-field">
                            <input type="text" className="neu-form-soft-input" required />
                            <label className="neu-form-soft-label">Email or Phone</label>
                        </div>
                        <div className="neu-form-soft-field">
                            <input type="password" className="neu-form-soft-input" required />
                            <label className="neu-form-soft-label">Password</label>
                        </div>
                        <button type="button" className="neu-form-soft-btn">Sign in</button>
                    </div>
                    <span className="component-label">neu-form-soft-login</span>
                </div>

                {/* 13 - Brutalist Form */}
                <div className="component-wrapper" data-name="neu-form-brutalist">
                    <div className="neu-form-brutalist">
                        <p className="neu-form-brutalist-title">SIGN UP</p>
                        <div className="neu-form-brutalist-group">
                            <label className="neu-form-brutalist-subtitle">Name</label>
                            <input placeholder="Enter your name" className="neu-form-brutalist-input" type="text" />
                        </div>
                        <div className="neu-form-brutalist-group">
                            <label className="neu-form-brutalist-subtitle">Email</label>
                            <input placeholder="Enter your email" className="neu-form-brutalist-input" type="email" />
                        </div>
                        <button type="button" className="neu-form-brutalist-btn">SIGN UP</button>
                    </div>
                    <span className="component-label">neu-form-brutalist</span>
                </div>

                {/* 14 - Instagram Style Form */}
                <div className="component-wrapper" data-name="neu-form-instagram" style={{ gridColumn: 'span 2' }}>
                    <div className="neu-form-instagram">
                        <div className="neu-form-instagram-logo">Instagram</div>
                        <input type="email" className="neu-form-instagram-input" placeholder="Phone, email or username" />
                        <input type="password" className="neu-form-instagram-input" placeholder="Password" />
                        <button type="button" className="neu-form-instagram-submit">Log in</button>
                        <div className="neu-form-instagram-or">or</div>
                        <button type="button" className="neu-form-instagram-fb">Login with facebook</button>
                    </div>
                    <span className="component-label">neu-form-instagram</span>
                </div>

                {/* 15 - OTP Verify Form */}
                <div className="component-wrapper" data-name="neu-form-otp-verify">
                    <div className="neu-form-otp-verify">
                        <p className="neu-form-otp-heading">Verify</p>
                        <div className="neu-form-otp-box-group">
                            <input type="password" className="neu-form-otp-input" maxLength={1} />
                            <input type="password" className="neu-form-otp-input" maxLength={1} />
                            <input type="password" className="neu-form-otp-input" maxLength={1} />
                            <input type="password" className="neu-form-otp-input" maxLength={1} />
                        </div>
                        <button type="button" className="neu-form-otp-submit">Submit</button>
                        <button type="button" className="neu-form-otp-back">Back</button>
                    </div>
                    <span className="component-label">neu-form-otp-verify</span>
                </div>

                {/* 16 - Dark Slider Form */}
                <div className="component-wrapper dark-bg" data-name="neu-form-dark-slider" style={{ gridColumn: 'span 2' }}>
                    <div className="neu-form-dark-slider">
                        <span className="neu-form-dark-slider-title">Login</span>
                        <div className="neu-form-dark-slider-control">
                            <input required className="neu-form-dark-slider-input" type="text" />
                            <label className="neu-form-dark-slider-label">Username</label>
                        </div>
                        <div className="neu-form-dark-slider-control">
                            <input required className="neu-form-dark-slider-input" type="password" />
                            <label className="neu-form-dark-slider-label">Password</label>
                        </div>
                        <button type="button" className="neu-form-dark-slider-btn">Login</button>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-form-dark-slider</span>
                </div>

            </div>
        </section>
    );
}
