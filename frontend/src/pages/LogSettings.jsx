import { useEffect, useState } from 'react';
import { apiGet } from '../services/apiService';
import HeaderLayout from "../layouts/HeaderLayout";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { AccordionSummary, Box, AccordionDetails, Accordion, Typography } from "@mui/material"
import { useAlerts } from '../contexts/AlertsContext';
import ErrorAlert from '../components/Alerts/ErrorAlert';
import BackICon from '../components/BackIcon/BackICon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LogSettings = () => {
    const [logs, setLogs] = useState(null);
    const { errorAlert, toggleErrorAlert } = useAlerts();

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await apiGet('/logs/');
                setLogs(res);
            } catch (error) {
                toggleErrorAlert();
            }
        };

        fetchLogs();
    }, []);

  return (
    <>
        <HeaderLayout>
            <HeaderBar name={'ERROR LOGS'} section={'SETTINGS'} />
        </HeaderLayout>
        <BackICon />
        <Box sx={{
        m: '20px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px'
        }}>
            <Box sx={{width: '100%', maxWidth: '800px'}}>
                {logs !== null ? (
                    [...logs].reverse().map((logObject) => {
                        const logId = Object.keys(logObject)[0];
                        const logData = logObject[logId];
                        return (
                            <Accordion key={logId} sx={{
                            background: '#ffffff',
                            boxShadow: 3,
                            paddingBottom: '0px',
                            paddingTop: '0px',
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#D36135' }} />}>
                                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                        {`${logData.timestamp}: ${logData.endpoint}`}
                                    </Typography>
                                    <Typography variant="body1">
                                        {logData.status}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1">
                                        {logData.error}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                ) : (
                    <Typography variant="h2" sx={{ textAlign: 'center' }}>
                        No logs are available..
                    </Typography>
                )}
            </Box>
        </Box>
        {errorAlert && <ErrorAlert />}
    </>
  )
}

export default LogSettings