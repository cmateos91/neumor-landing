'use client';

import { useState } from 'react';
import './styles.css';
import ButtonsSection from './components/ButtonsSection';
import InputsSection from './components/InputsSection';
import CardsSection from './components/CardsSection';
import ControlsSection from './components/ControlsSection';
import WidgetsSection from './components/WidgetsSection';

export default function UiverseElementsPage() {
    const [activeTab, setActiveTab] = useState('buttons');

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="uiverse-page kit-layout">
            {/* --- SIDEBAR --- */}
            <aside className="kit-sidebar">
                <h2 className="kit-title" style={{ fontSize: '1.5rem', marginBottom: '30px' }}>NeumorKit</h2>
                <nav>
                    <a onClick={() => scrollToSection('buttons')} className={`kit-nav-item ${activeTab === 'buttons' ? 'active' : ''}`}>Buttons</a>
                    <a onClick={() => scrollToSection('inputs')} className={`kit-nav-item ${activeTab === 'inputs' ? 'active' : ''}`}>Inputs & Forms</a>
                    <a onClick={() => scrollToSection('cards')} className={`kit-nav-item ${activeTab === 'cards' ? 'active' : ''}`}>Cards & Containers</a>
                    <a onClick={() => scrollToSection('controls')} className={`kit-nav-item ${activeTab === 'controls' ? 'active' : ''}`}>Controls & Toggles</a>
                    <a onClick={() => scrollToSection('widgets')} className={`kit-nav-item ${activeTab === 'widgets' ? 'active' : ''}`}>Widgets & Media</a>
                </nav>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="kit-main">
                <ButtonsSection />
                <InputsSection />
                <CardsSection />
                <ControlsSection />
                <WidgetsSection />
            </main>
        </div>
    );
}
