// ** React Imports
import { ChangeEvent, forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import InputAdornment from '@mui/material/InputAdornment'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { FormControlLabel, Radio, RadioGroup, Switch } from '@mui/material'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const CreateSupplier = () => {
  // ** States
  const [date, setDate] = useState<DateType>(null)
  const [language, setLanguage] = useState<string[]>([])
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const [value, setValue] = useState<string>('checked')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  return (
    <Card>
      <CardHeader title='Create User' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Name' placeholder='Enter Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type='email' label='Email' placeholder='Enter Email' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Password'
                value={values.password}
                id='form-layouts-separator-password'
                onChange={handlePasswordChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={values.password2}
                label='Confirm Password'
                id='form-layouts-separator-password-2'
                onChange={handleConfirmChange('password2')}
                type={values.showPassword2 ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                      >
                        <Icon fontSize='1.25rem' icon={values.showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='DOB' placeholder='Leonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Role' placeholder='Carter' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField select fullWidth label='Role' id='form-layouts-separator-select' defaultValue=''>
                <MenuItem value='Admin'>Admin</MenuItem>
                <MenuItem value='Super User'>Super User</MenuItem>
                <MenuItem value='Customer'>Customer</MenuItem>
                <MenuItem value='Administrator'>Administrator</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={(date: Date) => setDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioGroup row value={value} name='simple-radio' onChange={handleChange} aria-label='simple-radio'>
                <FormControlLabel value='checked' control={<Radio />} label='Male' />
                <FormControlLabel value='unchecked' control={<Radio />} label='Female' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Switch defaultChecked />} label='Status' />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button type='reset' color='secondary' variant='tonal'>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateSupplier
