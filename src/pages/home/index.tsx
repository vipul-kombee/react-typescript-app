// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { SelectChangeEvent } from '@mui/material/Select'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { ThemeColor } from 'src/@core/layouts/types'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { data } from './data'
interface InvoiceStatusObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`${row.id}`}</Typography>
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`${row.name}`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'email',
    headerName: 'Email Id',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.email}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'role',
    headerName: 'Balance',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.role}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'DOB',
    headerName: 'DOB',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.DOB}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'gender',
    headerName: 'Gender',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.gender == 'male' ? 'Male' : 'Female'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.status ? 'Actice' : 'Inactive'}</Typography>
    )
  }
]

const UserList = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [value, setValue] = useState<string>('')
  const [statusValue, setStatusValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [userdata, setUserdata] = useState(data)

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleStatusValue = (e: SelectChangeEvent<unknown>) => {
    setStatusValue(e.target.value as string)
  }

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => console.log(row.id)}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ color: 'text.secondary' }} href={''}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={{ pathname: `/home/${row.id}/edit`, query: { id: row.id } }}
            >
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    select
                    fullWidth
                    label='User Status'
                    SelectProps={{ value: statusValue, onChange: e => handleStatusValue(e) }}
                  >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value='downloaded'>Sub Admin</MenuItem>
                    <MenuItem value='draft'>Administrator</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              callbackurl='/home/add'
              buttonName='Create User'
              placeHolderName='Search User'
              value={value}
              selectedRows={selectedRows}
              handleFilter={handleFilter}
            />
            <DataGrid
              autoHeight
              pagination
              rowHeight={50}
              rows={userdata}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default UserList
