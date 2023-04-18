import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import EditProfileForm from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { light } from '@mui/material/styles/createPalette';



const EditProfile = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Box>
        <Box
            sx={{
                padding: "1rem 6%",
                background: "linear-gradient(45deg, #134611, #4CAF50)",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                transition: "box-shadow 0.3s ease-in-out",
                animation: "fadeIn 0.5s ease-in-out",
                color: "white",
                "&:hover": {
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
                },
                "@keyframes fadeIn": {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 20,
                    },
                },
            }}
            width="100%" 
            backgroundColor={theme.palette.background.alt} 
            p="1rem 6%" 
            textAlign="center"
        >
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color={light}
                onClick={() => navigate('/home')}
                sx={{
                    "&:hover": {
                        background: `linear-gradient(to right, #1dd1a1, #10ac84)`,
                        cursor: 'pointer',
                        backgroundClip: 'text',
                        '-webkit-background-clip': 'text',
                        color: 'transparent'
                    }
                }}
            >
                Slime
            </Typography>
        </Box>

            <Box width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant='h5' sx={{ mb: '1.5rem' }}>
                    Feeling change? Show off that new look!
                </Typography>
                <EditProfileForm />
        </Box>
    </Box>
}

export default EditProfile;