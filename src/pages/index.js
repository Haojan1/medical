// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import protectedRoute from 'src/@core/utils/protectedRoute'
// ** MUI Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// ** Demo Components Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Trophy />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default protectedRoute(Dashboard)
