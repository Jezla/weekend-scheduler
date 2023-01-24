import React from "react";
import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ListView = (props) => {
  const [monthList1, setMonthList1] = React.useState([]);
  const [monthList2, setMonthList2] = React.useState([]);
  const [monthList3, setMonthList3] = React.useState([]);

  React.useEffect(() => {
    const quarters = [[1,2,3],[4,5,6],[7,8,9],[10,11,0]]
    const q = 0 // TODO: Un-hardcode this (get current quarter)
    setMonthList1(props.listDates.filter(date => date.getMonth() === quarters[q][0]))
    setMonthList2(props.listDates.filter(date => date.getMonth() === quarters[q][1]))
    setMonthList3(props.listDates.filter(date => date.getMonth() === quarters[q][2]))
  }, [props.listDates])

  const defaultBorder = {
    borderTop: '1px solid',
    borderLeft: '1px solid',
    borderRight: '1px solid',
    borderBottom: '1px solid',
    borderColor: 'divider',
  }

  return (
    <Container>
      <Grid
        container
        spacing={4}
        justifyContent='center'
      >
        <Grid
          container
          spacing={2}
        >
          {monthList1 && monthList1.map((date, index) => (
            <Grid
              sx={defaultBorder}
              key={index}
              {...{ xs: 6 }}
              minHeight={25}
              maxWidth={100}
            >
              {date.toLocaleDateString()}
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {monthList2 && monthList2.map((date, index) => (
            <Grid
              sx={defaultBorder}
              key={index}
              {...{ xs: 6 }}
              minHeight={25}
              maxWidth={100}
            >
              {date.toLocaleDateString()}
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {monthList3 && monthList3.map((date, index) => (
            <Grid
              sx={defaultBorder}
              key={index}
              {...{ xs: 6 }}
              minHeight={25}
              maxWidth={100}
            >
              {date.toLocaleDateString()}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
};

export default ListView;
