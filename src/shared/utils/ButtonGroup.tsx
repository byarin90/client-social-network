import {
  ToggleButtonGroup as MuiButtonGroup, ToggleButtonGroupProps as MuiButtonGroupProps, ToggleButton
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export type ButtonGroupOptionValue = string | number | boolean

export interface ButtonGroupOption {
  value: ButtonGroupOptionValue;
  label?: string
}

export interface ButtonGroupProps extends MuiButtonGroupProps {
  options: ButtonGroupOption[]
}

const useStyles = makeStyles({})(() => ({
  toggleButton: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        background: '#12BDF8',
        color: '#fff',
        '&:hover': {
          background: '#2FCCDA'
        }
      },
      border: 0,
      borderRadius: '10px',
    },
  }
}))

export default function ButtonGroup({ options, ...props }: ButtonGroupProps): JSX.Element {
  const { classes } = useStyles()

  return <MuiButtonGroup {...props} exclusive={true} >
    {options.map(({ label, value }, index) =>
      <ToggleButton className={classes.toggleButton} value={value} key={`button-${index}-${label || value}`}>
        {label || value}
      </ToggleButton>
    )}
  </MuiButtonGroup>
}