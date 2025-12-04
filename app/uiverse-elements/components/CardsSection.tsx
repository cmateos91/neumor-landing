'use client';

// Cada card tiene un data-name que puedes usar para identificarlo
// Ejemplo: "ponme la card neu-card-flat" o "usa la card neu-card-profile-dark"

export default function CardsSection() {
    return (
        <section id="cards" className="kit-section">
            <h2 className="section-title">Cards Collection (23 elementos de Uiverse.io)</h2>
            <div className="component-grid">

                {/* 1 */}
                <div className="component-wrapper" data-name="neu-card-flat">
                    <div className="neu-card-flat">
                        <p className="neu-card-flat-title">Card Title</p>
                        <p className="neu-card-flat-text">Simple neumorphic card with flat shadow effect.</p>
                    </div>
                    <span className="component-label">neu-card-flat</span>
                </div>

                {/* 2 */}
                <div className="component-wrapper" data-name="neu-card-inset-shadow">
                    <div className="neu-card-inset-shadow">
                        <p className="neu-card-inset-title">Inset Card</p>
                        <p className="neu-card-inset-text">Card with inset shadow styling.</p>
                    </div>
                    <span className="component-label">neu-card-inset-shadow</span>
                </div>

                {/* 3 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-profile-dark">
                    <div className="neu-card-profile-dark">
                        <div className="neu-card-profile-dark-avatar">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <p className="neu-card-profile-dark-name">John Doe</p>
                        <div className="neu-card-profile-dark-social">
                            <a href="#" className="neu-card-social-github">
                                <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            <a href="#" className="neu-card-social-twitter">
                                <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-profile-dark</span>
                </div>

                {/* 4 */}
                <div className="component-wrapper" data-name="neu-card-profile-light">
                    <div className="neu-card-profile-light">
                        <div className="neu-card-profile-light-avatar"></div>
                        <div className="neu-card-profile-light-info">
                            <span>John Doe</span>
                            <p>Web Dev</p>
                        </div>
                        <a href="#" className="neu-card-profile-light-btn">Follow</a>
                    </div>
                    <span className="component-label">neu-card-profile-light</span>
                </div>

                {/* 5 */}
                <div className="component-wrapper" data-name="neu-card-paper">
                    <div className="neu-card-paper">
                        <div className="neu-card-paper-overlay"></div>
                        <div className="neu-card-paper-inner">YOUR<br/>CONTENT<br/>HERE</div>
                    </div>
                    <span className="component-label">neu-card-paper</span>
                </div>

                {/* 6 */}
                <div className="component-wrapper" data-name="neu-card-notification">
                    <div className="neu-card-notification">
                        <div className="neu-card-notif-left">
                            <div className="neu-card-notif-dot"></div>
                        </div>
                        <div className="neu-card-notif-right">
                            <p className="neu-card-notif-text"><strong>Jane Doe</strong> invited you to edit</p>
                            <p className="neu-card-notif-time">2 hours ago</p>
                            <div className="neu-card-notif-actions">
                                <button className="neu-card-notif-primary">View</button>
                                <button className="neu-card-notif-secondary">Dismiss</button>
                            </div>
                        </div>
                    </div>
                    <span className="component-label">neu-card-notification</span>
                </div>

                {/* 7 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-stats">
                    <div className="neu-card-stats">
                        <div className="neu-card-stats-ray"></div>
                        <div className="neu-card-stats-number">750k</div>
                        <div className="neu-card-stats-label">Views</div>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-stats</span>
                </div>

                {/* 8 */}
                <div className="component-wrapper" data-name="neu-card-product">
                    <div className="neu-card-product">
                        <div className="neu-card-product-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
                            </svg>
                        </div>
                        <p className="neu-card-product-title">Product Name</p>
                        <p className="neu-card-product-desc">Premium quality item</p>
                        <div className="neu-card-product-footer">
                            <span className="neu-card-product-price">$21.00</span>
                            <button className="neu-card-product-btn">Order</button>
                        </div>
                    </div>
                    <span className="component-label">neu-card-product</span>
                </div>

                {/* 9 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-purple-hover">
                    <div className="neu-card-purple-hover">
                        <div className="neu-card-purple-title">Card Title</div>
                        <div className="neu-card-purple-content">Lorem Ipsum is simply dummy text of the printing industry.</div>
                        <button className="neu-card-purple-btn">Learn more</button>
                        <div className="neu-card-purple-bar">
                            <div className="neu-card-purple-bar-empty"></div>
                            <div className="neu-card-purple-bar-filled"></div>
                        </div>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-purple-hover</span>
                </div>

                {/* 10 */}
                <div className="component-wrapper" data-name="neu-card-gradient-border">
                    <div className="neu-card-gradient-border">
                        <div className="neu-card-gradient-content">
                            <p className="neu-card-gradient-title">Gradient</p>
                            <p className="neu-card-gradient-text">Card with gradient border effect</p>
                        </div>
                    </div>
                    <span className="component-label">neu-card-gradient-border</span>
                </div>

                {/* 11 */}
                <div className="component-wrapper" data-name="neu-card-pricing">
                    <div className="neu-card-pricing">
                        <p className="neu-card-pricing-plan">Pro Plan</p>
                        <p className="neu-card-pricing-price">$29<span>/mo</span></p>
                        <ul className="neu-card-pricing-features">
                            <li>Unlimited projects</li>
                            <li>Priority support</li>
                            <li>Advanced features</li>
                        </ul>
                        <button className="neu-card-pricing-btn">Subscribe</button>
                    </div>
                    <span className="component-label">neu-card-pricing</span>
                </div>

                {/* 12 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-glass">
                    <div className="neu-card-glass">
                        <p className="neu-card-glass-title">Glass Card</p>
                        <p className="neu-card-glass-text">Glassmorphism with neumorphic elements</p>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-glass</span>
                </div>

                {/* 13 */}
                <div className="component-wrapper" data-name="neu-card-image">
                    <div className="neu-card-image">
                        <div className="neu-card-image-placeholder"></div>
                        <div className="neu-card-image-body">
                            <p className="neu-card-image-title">Image Card</p>
                            <p className="neu-card-image-text">Card with image placeholder</p>
                        </div>
                    </div>
                    <span className="component-label">neu-card-image</span>
                </div>

                {/* 14 */}
                <div className="component-wrapper" data-name="neu-card-testimonial">
                    <div className="neu-card-testimonial">
                        <p className="neu-card-testimonial-quote">&quot;Great product! Highly recommend it to everyone.&quot;</p>
                        <div className="neu-card-testimonial-author">
                            <div className="neu-card-testimonial-avatar"></div>
                            <div>
                                <p className="neu-card-testimonial-name">John Doe</p>
                                <p className="neu-card-testimonial-role">CEO, Company</p>
                            </div>
                        </div>
                    </div>
                    <span className="component-label">neu-card-testimonial</span>
                </div>

                {/* 15 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-feature">
                    <div className="neu-card-feature">
                        <div className="neu-card-feature-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                        </div>
                        <p className="neu-card-feature-title">Development</p>
                        <p className="neu-card-feature-text">Build amazing products with our tools</p>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-feature</span>
                </div>

                {/* 16 */}
                <div className="component-wrapper" data-name="neu-card-accent-left">
                    <div className="neu-card-accent-left">
                        <p className="neu-card-accent-title">Accent Card</p>
                        <p className="neu-card-accent-text">Card with left color accent</p>
                    </div>
                    <span className="component-label">neu-card-accent-left</span>
                </div>

                {/* 17 */}
                <div className="component-wrapper" data-name="neu-card-info">
                    <div className="neu-card-info">
                        <div className="neu-card-info-header">
                            <span className="neu-card-info-icon">i</span>
                            <span className="neu-card-info-label">Info</span>
                        </div>
                        <p className="neu-card-info-text">Important information displayed in a clean card format.</p>
                    </div>
                    <span className="component-label">neu-card-info</span>
                </div>

                {/* 18 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-metric">
                    <div className="neu-card-metric">
                        <p className="neu-card-metric-label">Total Revenue</p>
                        <p className="neu-card-metric-value">$12,450</p>
                        <p className="neu-card-metric-change neu-positive">+12.5%</p>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-metric</span>
                </div>

                {/* 19 */}
                <div className="component-wrapper" data-name="neu-card-team">
                    <div className="neu-card-team">
                        <div className="neu-card-team-avatars">
                            <div className="neu-card-team-avatar"></div>
                            <div className="neu-card-team-avatar"></div>
                            <div className="neu-card-team-avatar"></div>
                        </div>
                        <p className="neu-card-team-title">Team Project</p>
                        <p className="neu-card-team-text">3 members collaborating</p>
                    </div>
                    <span className="component-label">neu-card-team</span>
                </div>

                {/* 20 */}
                <div className="component-wrapper" data-name="neu-card-task">
                    <div className="neu-card-task">
                        <div className="neu-card-task-header">
                            <span className="neu-card-task-badge">In Progress</span>
                        </div>
                        <p className="neu-card-task-title">Design Review</p>
                        <p className="neu-card-task-desc">Review the new design mockups</p>
                        <div className="neu-card-task-progress">
                            <div className="neu-card-task-progress-bar" style={{width: '65%'}}></div>
                        </div>
                    </div>
                    <span className="component-label">neu-card-task</span>
                </div>

                {/* 21 */}
                <div className="component-wrapper dark-bg" data-name="neu-card-weather">
                    <div className="neu-card-weather">
                        <div className="neu-card-weather-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                            </svg>
                        </div>
                        <p className="neu-card-weather-temp">24°C</p>
                        <p className="neu-card-weather-city">New York</p>
                    </div>
                    <span className="component-label" style={{color: '#fff'}}>neu-card-weather</span>
                </div>

                {/* 22 */}
                <div className="component-wrapper" data-name="neu-card-social">
                    <div className="neu-card-social">
                        <div className="neu-card-social-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                            </svg>
                        </div>
                        <p className="neu-card-social-handle">@username</p>
                        <p className="neu-card-social-followers">10.5K followers</p>
                    </div>
                    <span className="component-label">neu-card-social</span>
                </div>

                {/* 23 */}
                <div className="component-wrapper" data-name="neu-card-cta">
                    <div className="neu-card-cta">
                        <p className="neu-card-cta-title">Ready to Start?</p>
                        <p className="neu-card-cta-text">Join thousands of happy customers today.</p>
                        <button className="neu-card-cta-btn">Get Started</button>
                    </div>
                    <span className="component-label">neu-card-cta</span>
                </div>

            </div>
        </section>
    );
}
