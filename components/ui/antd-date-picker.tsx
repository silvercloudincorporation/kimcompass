"use client"

import type React from "react"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/en"

// Note: The CSS will be imported globally in the providers.tsx file

dayjs.locale("en")

interface AntdDatePickerProps {
  onChange: (date: dayjs.Dayjs | null, dateString: string | string[]) => void
  defaultValue?: dayjs.Dayjs
  placeholder?: string
  disabled?: boolean
}

const AntdDatePicker: React.FC<AntdDatePickerProps> = ({ onChange, defaultValue, placeholder, disabled }) => {
  return <DatePicker onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} />
}

export default AntdDatePicker
