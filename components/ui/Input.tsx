'use client';

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react';

/* Accessibility rebuild.
 *
 * Every control here previously rendered a <label> with no `htmlFor` and an
 * input with no `id`, so nothing connected them: a screen reader announced an
 * unlabelled edit field. Errors were plain <p> tags that were never announced
 * at all, and `aria-invalid` was absent, so assistive tech had no idea a field
 * had failed. On the only element of this site that generates leads.
 *
 * Now: useId() ties label → control, aria-describedby ties control → error and
 * helper text, aria-invalid marks the failure, and role="alert" announces it.
 * Styling follows DESIGN.md → Component Rules: inputs are lines, not boxes.
 */

function useFieldIds(explicitId?: string) {
    const generated = useId();
    const id = explicitId ?? generated;
    return { id, errorId: `${id}-error`, helperId: `${id}-helper` };
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', type = 'text', id: explicitId, ...props }, ref) => {
        const { id, errorId, helperId } = useFieldIds(explicitId);
        const describedBy = [error ? errorId : null, helperText && !error ? helperId : null]
            .filter(Boolean)
            .join(' ') || undefined;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="field-label">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-bad" aria-hidden="true">
                                *
                            </span>
                        )}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                    className={`input-field ${className}`}
                    {...props}
                />
                {error && (
                    <p id={errorId} role="alert" className="mt-1.5 text-sm text-bad">
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p id={helperId} className="mt-1.5 text-sm text-ink-soft">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        { label, error, options, placeholder = 'Select an option', className = '', id: explicitId, ...props },
        ref
    ) => {
        const { id, errorId } = useFieldIds(explicitId);

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="field-label">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-bad" aria-hidden="true">
                                *
                            </span>
                        )}
                    </label>
                )}
                <select
                    ref={ref}
                    id={id}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    className={`input-field appearance-none ${className}`}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p id={errorId} role="alert" className="mt-1.5 text-sm text-bad">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className = '', id: explicitId, ...props }, ref) => {
        const { id, errorId } = useFieldIds(explicitId);

        return (
            <div className="w-full">
                <div className="flex items-start gap-3">
                    <input
                        ref={ref}
                        id={id}
                        type="checkbox"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? errorId : undefined}
                        className={`mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 border border-[color:var(--line-strong)] accent-[color:var(--lawn)] ${className}`}
                        {...props}
                    />
                    <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-soft">
                        {label}
                    </label>
                </div>
                {error && (
                    <p id={errorId} role="alert" className="mt-1.5 text-sm text-bad">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, rows = 4, className = '', id: explicitId, ...props }, ref) => {
        const { id, errorId } = useFieldIds(explicitId);

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="field-label">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    rows={rows}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    className={`input-field resize-none ${className}`}
                    {...props}
                />
                {error && (
                    <p id={errorId} role="alert" className="mt-1.5 text-sm text-bad">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
