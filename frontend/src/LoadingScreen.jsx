import { useEffect, useState } from 'react';
import './LoadingScreen.css';
import { useLoading } from './LoadingContext';
import acssLogo from './ACSS.jpg';
import ccsLogo from './CCS Logo.png';
import sitesLogo from './SITES.jpg';

const LINE1 = 'College of Computing Studies';
const LINE2 = 'University of Cabuyao';

export default function LoadingScreen({ onDone }) {
  const [exit, setExit] = useState(false);
  const { setVisible } = useLoading();

  useEffect(() => {
    // Shorter animation — 1.8s hold, 2.2s total
    const hold = setTimeout(() => setExit(true), 1800);
    const done = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 2200);
    return () => { clearTimeout(hold); clearTimeout(done); };
  }, []);

  return (
    <div className={`ls-overlay${exit ? ' ls-exit' : ''}`}>
      <div className="ls-content">
        {/* Three logos */}
        <div className="ls-logos">
          <img src={acssLogo} alt="ACSS Logo" className="ls-logo ls-logo--delay0" />
          <img src={ccsLogo} alt="CCS Logo" className="ls-logo ls-logo--center ls-logo--delay1" />
          <img src={sitesLogo} alt="SITES Logo" className="ls-logo ls-logo--delay2" />
        </div>

        {/* Animated text lines */}
        <div className="ls-text">
          <div className="ls-line">
            {LINE1.split('').map((ch, i) => (
              <span
                key={i}
                className="ls-char"
                style={{ animationDelay: `${0.4 + i * 0.045}s` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
          <div className="ls-line ls-line--sub">
            {LINE2.split('').map((ch, i) => (
              <span
                key={i}
                className="ls-char"
                style={{ animationDelay: `${0.9 + i * 0.04}s` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="ls-bar"><div className="ls-bar-fill" /></div>
      </div>
    </div>
  );
}
