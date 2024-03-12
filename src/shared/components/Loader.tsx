/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { CircularProgress, SxProps, Typography } from '@mui/material'

export interface LoaderProps {
  label?: string
  color?: string
  value?: number | undefined
  size?: number | string
  loaderStyle?: SxProps
  labelStyle?: SxProps
}

export type StylesProps = {
  label?: string
  color?: string
  value?: number
  size?: number | string
  loaderStyle?: SxProps
  labelStyle?: SxProps
}

export default function Loader({
  label,
  color = 'black',
  value = 0,
  size = 40,
  loaderStyle = {},
  labelStyle = {},
}: LoaderProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress
        variant={value ? 'determinate' : 'indeterminate'}
        value={value}
        size={size}
        sx={{ color, ...loaderStyle }}
      />
      {label && <Typography sx={{ paddingTop: 2, ...labelStyle }}>{label}</Typography>}
    </div>
  )
}
