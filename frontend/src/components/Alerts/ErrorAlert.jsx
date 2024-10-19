import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useAlerts } from '../../contexts/AlertsContext';

const ErrorAlert = () => {
  const { toggleErrorAlert } = useAlerts();

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleErrorAlert(); //
    }, 10000);  // Ms

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Alert sx={{
        m:'20px',
        position: 'fixed',
        bottom: '66px',
        left: '0',
        right: '0',
        margin: '0 20px',
        zIndex: 9999,
        width: 'auto',
        }}
        severity="error"
        onClose={() => toggleErrorAlert()}
    >
        Failed request, see logs for details
    </Alert>
  );
};

export default ErrorAlert;
