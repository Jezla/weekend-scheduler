import React from "react";
import { Container, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const PubHolsList = (props) => {
    const [pubHolList, setPubHolList] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);

    React.useEffect(() => {
        const q = 0 // TODO

        const formatPubHolList = () => {
            const holDays = [...props.listDates].filter(date => date.getDay() != 0 && date.getDay() != 6);
            return holDays;
        }

        setPubHolList(formatPubHolList())

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

    const displayDate = (date) => {
        return (
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid
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
                        } else if (props.selectedDates.length === 12) {
                            setOpenAlert(true)
                        }  else {
                            props.setSelectedDates([...props.selectedDates, date.toLocaleDateString()])
                        }
                    }}
                >
                    {date.toLocaleDateString()}
                </Grid>
            </Grid>
        )
    }

    return (
        <>
        <br></br>
            <Typography
                sx={{ fontWeight: 'bold' }}
                align='center'
            >
                Public Holidays
            </Typography>
            <Container sx={{ pt: 1 }}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    xs="auto"
                    sx={{ pl: 4, pr: 4 }}
                    direction='row'
                >
                    {pubHolList.map((date) => {
                    return displayDate(date);
                })}
                </Grid >
            </Container>
            <br></br>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Maximum shifts selected!
                </Alert>
            </Snackbar>
        </>
    )
};

export default PubHolsList;
