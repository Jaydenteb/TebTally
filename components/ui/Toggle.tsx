'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`toggle-wrapper ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={toggleId}
          className="toggle-input"
          {...props}
        />
        <label htmlFor={toggleId} className="toggle-label">
          <span className="toggle-switch"></span>
          {label && <span className="toggle-text">{label}</span>}
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
