/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalenderIcon from "@/modules/shared/assets/svgs/calender-icon.svg";
import { TextField } from "../TextField";
import { FormControl, FormHelperText } from "@mui/material";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  value?: string | null;
  errorText?: string;
  label?: string;
  labelOnTop?: boolean;
  requiredAsterisk?: boolean;
  errorTextClassName?: string;
  labelClassName?: string;
  variant?: string;
  fullWidth?: any;
  onChange?: (event: any) => void;
}

export function DatePicker({
  onChange,
  labelOnTop,
  requiredAsterisk,
  labelClassName,
  label,
  errorTextClassName,
  errorText,
  variant = "outlined",
  value,
  ...props
}: DatePickerProps) {

    const parsedValue: Dayjs | null = value ? dayjs(value) : null;

  return (
    <FormControl
      error={!!errorText}
      fullWidth={props.fullWidth === undefined ? true : props.fullWidth}
    >
      {labelOnTop && (
        <label className={classNames("bd-text-field-label text-xs font-medium", labelClassName)}>
          {label}
          {requiredAsterisk && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDatePicker
          value={parsedValue}
            onChange={(newValue) => {
            // Convert back to string when calling onChange
            onChange?.(newValue?.format("YYYY-MM-DD") ?? "");
          }}
          slots={{
            openPickerIcon: CalenderIcon,
            textField: TextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,

               InputProps: {
     
            classes: {
              notchedOutline: classNames({
                "!border-outline-color !border !border-solid ": variant === "outlined",
              }),
            },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D0D5DD",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D0D5DD",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#008080",
                borderWidth: "1px",
              },
            },
            className: classNames(
              "rounded-lg !text-xs !h-10",
          
            ),
            inputProps: {
              className: "!text-dark !text-xs",
            },
          }
          
            },
          }}
      
        />
        {errorText && (
          <FormHelperText className={classNames("relative -left-3", errorTextClassName)}>
            {errorText}
          </FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
}
