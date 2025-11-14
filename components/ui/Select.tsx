import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, className = '', ...props }, ref) => {
    return (
      <div className="select-wrapper">
        {label && <label className="select-label">{label}</label>}
        <select
          ref={ref}
          className={`select ${className}`}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
