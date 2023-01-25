import React from "react";
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ListView = (props) => {
  const [monthList1, setMonthList1] = React.useState([]);
  const [monthList2, setMonthList2] = React.useState([]);
  const [monthList3, setMonthList3] = React.useState([]);


  React.useEffect(() => {
    const q = 0 // TODO: Un-hardcode this (get current quarter)

    const formatMonthList = (q, i) => {
      const quarters = [[1,2,3],[4,5,6],[7,8,9],[10,11,0]];
      const filteredMonth = props.listDates.filter(date => date.getMonth() === quarters[q][i]);
      if (filteredMonth[0].getDay() === 'Sunday') {
        filteredMonth.unshift(null)
      }

      if (filteredMonth.length % 2 !== 0) {
        filteredMonth.push(null)
      }

      const splitDays = filteredMonth.reduce((days, date, index) => {
        return (index % 2 === 0 ? days.push([date]) : days[days.length-1].push(date)) && days;
      }, []);

      return splitDays;
    }

    setMonthList1(formatMonthList(q, 0))
    setMonthList2(formatMonthList(q, 1))
    setMonthList3(formatMonthList(q, 2))
  }, [props.listDates])

  const defaultBorder = {
    borderTop: '1px solid',
    borderLeft: '1px solid',
    borderBottom: '1px solid',
    borderRight: '1px solid',
    borderColor: 'divider',
    textAlign: 'center'
  }

  const noBottomRight = {
    borderTop: '1px solid',
    borderLeft: '1px solid',
    borderBottom: '1px solid',
    borderRight: '1px solid',
    borderColor: 'divider',
    borderRightColor: 'white',
    borderBottomColor: 'white',
  }

  const displayDate = (pair, index) => {
    return (
      <Grid
        container
        key={'p' + index}
        justifyContent="center"
        alignItems="center"
      >
        {pair.map((date, pairIndex) => {
          if (date === null)  {
            return (
              <Grid
                key={'p' + index + 'i' + pairIndex}
                minHeight={25}
                minWidth={100}
                sx={index === 0 ? defaultBorder : noBottomRight}
                xs={6}
              >
                &nbsp;
              </Grid>
            )
          }
          return (
            <Grid
              key={'p' + index + 'i' + pairIndex}
              minHeight={25}
              minWidth={100}
              sx={props.selectedDates.includes(date.toLocaleDateString())
                ? {...defaultBorder, cursor: 'pointer', backgroundColor: '#ccc'}
                : {...defaultBorder, cursor: 'pointer'}
              }
              xs={6}
              onClick={() => {
                if (props.selectedDates.includes(date.toLocaleDateString())) {
                  const index = props.selectedDates.indexOf(date.toLocaleDateString())
                  const newDates = [...props.selectedDates]
                  newDates.splice(index, 1);
                  props.setSelectedDates(newDates)
                } else if (props.selectedDates.length === 6) {
                  // TODO: Put some sort of max alert popup thingo
                } else {
                  props.setSelectedDates([...props.selectedDates, date.toLocaleDateString()])
                }
              }}
            >
              {date.toLocaleDateString()}
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <Container
      sx={{ pt:4 }}
    >
      <Grid
        container
        spacing={2}
        justifyContent='center'
      >
        <Grid
          container
          xs={4}
          sx={{ pl: 2, pr: 2 }}
          direction='column'
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              {monthList1[0] && monthList1[0][1].toLocaleString('default', { month: 'long' })}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              minHeight={25}
              minWidth={100}
              sx={defaultBorder}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
            </Grid>
            <Grid
              minHeight={25}
              minWidth={100}
              sx={defaultBorder}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
            </Grid>
          </Grid>
          {monthList1 && monthList1.map((pair, index) => {
            return displayDate(pair, index)
          })}
        </Grid>
        <Grid
          container
          xs={4}
          sx={{ pl: 2, pr: 2 }}
          direction='column'
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              {monthList2[0] && monthList2[0][1].toLocaleString('default', { month: 'long' })}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              minHeight={25}
              minWidth={100}
              sx={defaultBorder}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
            </Grid>
            <Grid
              minHeight={25}
              minWidth={100}
              sx={defaultBorder}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
            </Grid>
          </Grid>
          {monthList2 && monthList2.map((date, index) => {
            return displayDate(date, index)
          })}
        </Grid>
        <Grid
          container
          xs={4}
          sx={{ pl: 2, pr: 2 }}
          direction='column'
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              {monthList3[0] && monthList3[0][1].toLocaleString('default', { month: 'long' })}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              minHeight={25}
              minWidth={100}
              sx={{...defaultBorder, textAlign: 'center' }}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
            </Grid>
            <Grid
              minHeight={25}
              minWidth={100}
              sx={{...defaultBorder, textAlign: 'center' }}
              xs={6}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
            </Grid>
          </Grid>
          {monthList3 && monthList3.map((date, index) => {
            return displayDate(date, index)
          })}
        </Grid>
      </Grid>
    </Container>
  )
};

export default ListView;
