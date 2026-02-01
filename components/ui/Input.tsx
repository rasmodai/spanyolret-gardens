'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-anthracite mb-1">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={`
            w-full px-4 py-3 rounded-lg border 
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-primary focus:ring-primary/20'}
            focus:ring-2 transition-all duration-200 outline-none
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;

// Select Component
interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-anthracite mb-1">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg border appearance-none bg-white
            ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary'}
            focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none
            ${className}
          `}
                    {...props}
                >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

// Checkbox Component
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        ref={ref}
                        type="checkbox"
                        className={`
              w-5 h-5 rounded border-gray-300 text-primary 
              focus:ring-primary/20 focus:ring-2 mt-0.5
              ${className}
            `}
                        {...props}
                    />
                    <span className="text-sm text-gray-600">{label}</span>
                </label>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';

// Textarea Component
interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, rows = 4, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-anthracite mb-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={rows}
                    className={`
            w-full px-4 py-3 rounded-lg border resize-none
            ${error ? 'border-red-500' : 'border-gray-300 focus:border-primary'}
            focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
