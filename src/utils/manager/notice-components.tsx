import React from 'react'
import clsx from 'clsx'
import {
  EditBlue,
  EditBrown,
  EditCyan,
  EditGreen,
  EditLime,
  EditOrrange,
  EditPink,
  EditPurple,
  EditRed,
  EditYellow,
} from '@/assets/svgComponents/manager'
import { COLOR_OPTIONS } from './notice'

// 색깔별 편집 아이콘 매핑
export const getCategoryEditIcon = (color: string, size: number = 16): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    brown: <EditBrown width={size} height={size} />,
    green: <EditGreen width={size} height={size} />,
    purple: <EditPurple width={size} height={size} />,
    blue: <EditBlue width={size} height={size} />,
    yellow: <EditYellow width={size} height={size} />,
    red: <EditRed width={size} height={size} />,
    cyan: <EditCyan width={size} height={size} />,
    pink: <EditPink width={size} height={size} />,
    orange: <EditOrrange width={size} height={size} />,
    lime: <EditLime width={size} height={size} />,
  }
  const key = color.toLowerCase()
  return iconMap[key] || <EditBlue width={size} height={size} />
}

// 색상 드롭다운용 옵션 생성 (JSX 포함)
export const createColorDropdownOptions = () => {
  return COLOR_OPTIONS.map((option) => ({
    label: option.nameKr,
    value: option.value,
    icon: <div className={clsx('h-5 w-5 rounded-full border', option.circle)} />,
  }))
}
