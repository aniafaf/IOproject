import { PropsWithoutRef } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  // currently open tab index
  value: number
  className?: string
}

export const TabPanel = ({
  index,
  value,
  children,
  className,
}: TabPanelProps) => (
  <div
    role='tabpanel'
    className={`tab-panel ${className ?? ''}`}
    hidden={value !== index}
  >
    {value === index && children}
  </div>
)
