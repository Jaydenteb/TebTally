'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, showValue = true, valueFormatter, className = '', value, ...props }, ref) => {
    const displayValue = valueFormatter && value
      ? valueFormatter(Number(value))
      : value;

    return (
      <div className="slider-wrapper">
        {(label || showValue) && (
          <div className="slider-header">
            {label && <label className="slider-label">{label}</label>}
            {showValue && <span className="slider-value">{displayValue}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          className={`slider ${className}`}
          value={value}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
