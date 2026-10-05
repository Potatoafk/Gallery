import { ArrowUpRight } from 'lucide-react'
import DriftWall from '../@/components/DriftWall'
import './App.css'

function App() {
    return (
        <main className="landing-page">
            <div className="wall-layer" aria-hidden="true">
                <DriftWall
                    columns={6}
                    tileWidth={220}
                    tileHeight={148}
                    gap={20}
                    tilt={12}
                    turn={-10}
                    speed={34}
                    dim={0.72}
                    fade={0.72}
                    overlayColor="#14211d"
                    className="wall"
                />
            </div>
            <div className="shade" aria-hidden="true" />

            <nav className="nav-bar" aria-label="Main navigation">
                <a className="wordmark" href="#top" aria-label="Morrow home">
                    MORROW<span>.</span>
                </a>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#journal">Journal</a>
                    <a className="nav-contact" href="#contact">
                        Get in touch <ArrowUpRight size={16} strokeWidth={1.8} />
                    </a>
                </div>
            </nav>

            <section className="hero-content" id="top">
                <p className="eyebrow">A studio for considered things</p>
                <h1>Make room<br />for wonder.</h1>
                <p className="intro">
                    Morrow brings thoughtful people and ideas together to shape what comes next.
                </p>
                <a className="primary-link" href="#about">
                    Discover Morrow <ArrowUpRight size={18} strokeWidth={1.8} />
                </a>
            </section>

            <footer className="page-footer">
                <span>Independent since 2017</span>
                <span>Scroll to explore <b>↓</b></span>
            </footer>
        </main>
    )
}

export default App
