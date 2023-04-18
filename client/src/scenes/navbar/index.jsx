import { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';



const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const nuetralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.alt;


    

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween
            sx={{
                padding: "1rem 6%",
                background: "linear-gradient(45deg, #134611, #4CAF50)",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                transition: "box-shadow 0.3s ease-in-out",
                animation: "fadeIn 0.5s ease-in-out",
                color: "white",
                "&:hover": {
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.8)",
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
        >
        <FlexBetween gap="1.75rem">
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color={primaryLight}
                onClick={() => navigate('/home')}
                sx={{
                    "&:hover": {
                    background: `linear-gradient(to right, #1dd1a1, #10ac84)`,
                    cursor: 'pointer',
                    backgroundClip: 'text',
                    '-webkit-background-clip': 'text',
                    color: 'transparent',
                    transform: 'translateY(2px)',
                    transition: 'all .5s ease-in-out'
                    }
                }}
            >
                Slime
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween 
                    backgroundColor={nuetralLight} 
                    borderRadius="9px" 
                    gap="3rem" 
                    padding="0.1rem 1.5rem"
                >
                    <InputBase
                    placeholder="Search.." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>

        {/* Desktop Nav */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: '25px'}} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: '25px'}} />
                    )}
                </IconButton>
                <Message sx={{fontSize: '25px'}} />
                <Notifications sx={{fontSize: '25px'}} />
                <Help sx={{fontSize: '25px'}} />
                <FormControl variant='standard' value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: nuetralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "&: .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "&: .MuiSelect-select:focus": {
                                backgroundColor: nuetralLight,
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        <MenuItem onClick={() => navigate('/edit/:id')}>Update User</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        ) : (
            <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
        )}

        {/* Mobile Nav */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
            {/* Close Icon */}
                <Box
                display="flex"
                justifyContent="flex-end"
                p="1rem"
                >
                    <IconButton 
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>
            {/* Menu Items */}
            <FlexBetween 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                gap="3rem"
            >
                <IconButton 
                    onClick={() => dispatch(setMode())}
                    sx={{fontSize: '25px'}}
                >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: '25px'}} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: '25px'}} />
                    )}
                </IconButton>
                <Message sx={{fontSize: '25px'}} />
                <Notifications sx={{fontSize: '25px'}} />
                <Help sx={{fontSize: '25px'}} />
                <FormControl variant='standard' value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: nuetralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "&: .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "&: .MuiSelect-select:focus": {
                                backgroundColor: nuetralLight,
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
            </Box>
        )}
        </FlexBetween>
    
)};

export default Navbar;