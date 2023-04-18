import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
    borderRadius: '0.5rem',
    background: 'linear-gradient(45deg, #134611, #4CAF50)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    transition: 'box-shadow 0.3s ease-in-out',
    animation: 'fadeIn 0.5s ease-in-out',
    color: "white",
    '&:hover': {
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.8)',
    },
    '@keyframes fadeIn': {
    from: {
        opacity: 0,
    },
    to: {
        opacity: 20,
    },
    },
}));

export default WidgetWrapper;