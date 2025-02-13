// ** React Imports
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'

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
import { useParams } from 'react-router-dom'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useRouter } from 'next/router'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { FormControlLabel, Radio, RadioGroup, Switch } from '@mui/material'
import axios from 'axios'
import { data } from '../../data'
import Link from 'next/link'
interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const EditUser = (props: any) => {
  // ** States
  const [date, setDate] = useState('')
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  const [value, setValue] = useState<string>('male')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)

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

  useEffect(() => {
    if (id) {
      const getUserdata = async () => {
        const response = data.filter(user => user.id === id)
        console.log(response)

        if (response.length > 0) {
          setName(response[0].name)
          setEmail(response[0].email)
          setRole(response[0].role)
          setDate(response[0].DOB)
          setValue(response[0].gender)
          setValues({
            password: response[0].password,
            password2: response[0].password2,
            showPassword: false,
            showPassword2: true
          })
          setStatus(response[0].status)
        }
      }
      getUserdata()
    }
  }, [id])
  return (
    <Card>
      <CardHeader title='Edit User' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={name}
                label='Name'
                onChange={e => setName(e.target.value)}
                placeholder='Enter Name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={email}
                type='email'
                onChange={e => setEmail(e.target.value)}
                label='Email'
                placeholder='Enter Email'
              />
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
              <CustomTextField
                select
                value={role}
                onChange={e => setRole(e.target.value)}
                fullWidth
                label='Role'
                id='form-layouts-separator-select'
                defaultValue={role}
              >
                <MenuItem value='-1'>Select Role</MenuItem>
                <MenuItem value='Admin'>Admin</MenuItem>
                <MenuItem value='Super-User'>Super User</MenuItem>
                <MenuItem value='Customer'>Customer</MenuItem>
                <MenuItem value='Administrator'>Administrator</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={date}
                type='text'
                onChange={e => setDate(e.target.value)}
                label='Date of Birth'
                placeholder='Enter DOB'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioGroup row value={value} name='simple-radio' onChange={handleChange} aria-label='simple-radio'>
                <FormControlLabel value='male' control={<Radio />} label='Male' />
                <FormControlLabel value='female' control={<Radio />} label='Female' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Switch defaultChecked value={status} />} label='Status' />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Link href={'/home'}>
            <Button type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
          </Link>
          <Link href={'/home/'}>
            <Button color='error' variant='tonal'>
              Cancel
            </Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  )
}

export default EditUser
