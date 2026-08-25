import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextArea?: boolean;
  isSelect?: boolean;
  options?: { label: string; value: string }[];
}

export function FormField({
  label,
  error,
  isTextArea = false,
  isSelect = false,
  options = [],
  className = "",
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || props.name;
  const baseClasses = `w-full px-3 py-2 text-sm bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
    error
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500"
  } ${className}`;

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>

      {isTextArea ? (
        <textarea id={inputId} className={`${baseClasses} min-h-[80px]`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : isSelect ? (
        <select id={inputId} className={baseClasses} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={inputId} className={baseClasses} {...props} />
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}