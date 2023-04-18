import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { light } from "@mui/material/styles/createPalette";


const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;


    const getUser = async () => {
        const response = await fetch(`http://localhost:8000/users/${userId}`, 
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();          
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* name row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{ "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            } 
                        }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography>
                            {friends.lenght} Friends</Typography>
                    </Box>
                    
                </FlexBetween>
                    <ManageAccountsOutlined onClick={() => navigate(`/edit/${userId}`)} />
                </FlexBetween>
                <Divider color="white" />

                {/* info row */}
                <Box p="1rem 0">
                        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                            <LocationOnOutlined fontSize="large" sx={{ color: light}} />
                            <Typography color={light}>
                                {location}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap="1rem">
                            <WorkOutlineOutlined fontSize="large" sx={{ color: light}} />
                            <Typography color={light}>
                                {occupation}
                            </Typography>
                        </Box>
                </Box>
                <Divider color="white" />

                {/* stats row */}
                <Box p="1rem 0">
                        <FlexBetween mb="0.5rem">
                            <Typography color={light}>Profile Views</Typography>
                            <Typography color={light} fontWeight="500">
                                {viewedProfile}
                                </Typography>
                        </FlexBetween>
                        <FlexBetween>
                        <Typography color={light}>Post Impressions</Typography>
                            <Typography color={light} fontWeight="500">
                                {impressions}
                                </Typography>
                        </FlexBetween>
                </Box>
                <Divider color="white" />

                {/* Socials row */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={light} mb="1rem" fontWeight="500">
                        Socials
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="\assests\twitter.png" alt="twitter" />
                            <Box>
                                <Typography color="main" fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Socials
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: light }} />
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <img src="\assests\linkedin.png" alt="linkedin" />
                            <Box>
                                <Typography color="main" fontWeight="500">
                                Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Networking
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: light }} />
                    </FlexBetween>
                </Box>

        </WidgetWrapper>
    )

    
    }

export default UserWidget;

