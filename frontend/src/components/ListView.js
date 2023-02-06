import React from "react";
import { Container, Typography, Snackbar, Alert} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ListView = (props) => {
  const [monthList1, setMonthList1] = React.useState([]);
  const [monthList2, setMonthList2] = React.useState([]);
  const [monthList3, setMonthList3] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);


  React.useEffect(() => {

    const formatMonthList = (i) => {
      const quarters = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 0]];

      let q = 0
      if (props.listDates[0]) {
        q = quarters.indexOf(quarters.filter(l => l.indexOf(props.listDates[0].getMonth()) !== -1)[0])
      }

      const filteredMonth = [...props.listDates].filter(date => date.getMonth() === quarters[q][i] && (date.getDay() === 0 || date.getDay() === 6));

      if (filteredMonth[0] && filteredMonth[0].getDay() === 'Sunday') {
        filteredMonth.unshift(null)
      }

      if (filteredMonth.length % 2 !== 0) {
        filteredMonth.push(null)
      }

      const splitDays = filteredMonth.reduce((days, date, index) => {
        return (index % 2 === 0 ? days.push([date]) : days[days.length - 1].push(date)) && days;
      }, []);

      return splitDays;
    }

    setMonthList1(formatMonthList(0))
    setMonthList2(formatMonthList(1))
    setMonthList3(formatMonthList(2))
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
          if (date === null) {
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
                ? { ...defaultBorder, cursor: 'pointer', backgroundColor: '#ccc' }
                : { ...defaultBorder, cursor: 'pointer' }
              }
              xs={6}
              onClick={() => {
                if (props.selectedDates.includes(date.toLocaleDateString())) {
                  const index = props.selectedDates.indexOf(date.toLocaleDateString())
                  const newDates = [...props.selectedDates]
                  newDates.splice(index, 1);
                  props.setSelectedDates(newDates)
                } else if (props.selectedDates.length === 6) {
                  setOpenAlert(true)
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
    <>
      <Container
        sx={{ pt: 4 }}
      >
        <Grid
          container
          spacing={2}
          columnGap={4}
          rowGap={4}
          columns={{ xs: 12, sm: 6, md: 4, lg: 4 }}
          justifyContent='center'
        >
          {monthList1[0] &&
            <Grid
              container
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
                  minWidth={150}
                  sx={defaultBorder}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
                </Grid>
                <Grid
                  minHeight={25}
                  minWidth={150}
                  sx={defaultBorder}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
                </Grid>
              </Grid>
              {monthList1 && monthList1.map((pair, index) => {
                return displayDate(pair, index);
              })}
            </Grid>
          }
          {monthList2[0] &&
            <Grid
              container
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
                  minWidth={150}
                  sx={defaultBorder}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
                </Grid>
                <Grid
                  minHeight={25}
                  minWidth={150}
                  sx={defaultBorder}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
                </Grid>
              </Grid>
              {monthList2 && monthList2.map((date, index) => {
                return displayDate(date, index);
              })}
            </Grid>
          }
          {monthList3[0] &&
            <Grid
              container
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
                  minWidth={150}
                  sx={{ ...defaultBorder, textAlign: 'center' }}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sat</Typography>
                </Grid>
                <Grid
                  minHeight={25}
                  minWidth={150}
                  sx={{ ...defaultBorder, textAlign: 'center' }}
                  xs={6}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Sun</Typography>
                </Grid>
              </Grid>
              {monthList3 && monthList3.map((date, index) => {
                return displayDate(date, index);
              })}
            </Grid>
          }
        </Grid>
      </Container>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          Maximum shifts selected!
        </Alert>
      </Snackbar>
    </>
  )
};

export default ListView;
