import React from "react";
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { textAlign } from "@mui/system";

const ListView = (props) => {
  const [monthList1, setMonthList1] = React.useState([]);
  const [monthList2, setMonthList2] = React.useState([]);
  const [monthList3, setMonthList3] = React.useState([]);

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
      return (index % 2 == 0 ? days.push([date]) : days[days.length-1].push(date)) && days;
    }, []);

    return splitDays;
  }

  React.useEffect(() => {
    const q = 0 // TODO: Un-hardcode this (get current quarter)
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
  }

  const displayDate = (pair, index) => {
    return (
      <Grid
        container
        key={index}
        justifyContent="center"
        alignItems="center"
      >
        {pair.map((date, index) => {
          if (date === null)  {
            return (
              <Grid
                key={index}
                minHeight={25}
                minWidth={100}
                sx={{...defaultBorder, textAlign: 'center' }}
                xs={6}
              >
                &nbsp;
              </Grid>
            )
          }
          return (
            <Grid
              key={index}
              minHeight={25}
              minWidth={100}
              sx={{...defaultBorder, textAlign: 'center' }}
              xs={6}
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
          {monthList3 && monthList3.map((date, index) => {
            return displayDate(date, index)
          })}
        </Grid>
      </Grid>
    </Container>
  )
};

export default ListView;
