import React from 'react';
import { TextareaAutosize } from '@mui/material';
import classNames from 'classnames';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelClassName?: string;
  className?: string;
  inputClasses?: string;
  errorMessage?: string;
  labelOnTop?: boolean;
  requiredAsterisk?: boolean;
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  labelClassName,
  className,
  inputClasses,
  errorMessage,
  labelOnTop = false,
  requiredAsterisk,
  minRows = 1,
  maxRows,
  ...props
}) => {
  return (
    <div className={classNames('flex flex-col w-full', className)}>
      {label && (
        <label
          className={classNames(
            'text-sm font-medium text-gray-700 mb-1',
            labelClassName
          )}
        >
          {label}
          {requiredAsterisk && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        className={classNames(
          'border border-[#D0D5DD] rounded-md p-2 text-sm outline-none resize-none focus:border-gray-500',
          inputClasses
        )}
        {...props}
      />

      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
