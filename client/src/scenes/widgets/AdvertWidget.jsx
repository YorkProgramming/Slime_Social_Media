import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={dark}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt="advert"
                src="\assests\advert01.jpg"
            />
            <FlexBetween>
                <Typography color={palette.neutral.light}>
                    OooLaLa Cosmetics.com
                </Typography>
            </FlexBetween>
            <Typography color={palette.neutral.light} m="0.5rem 0">
                The BEST for those OoLaLa moments
            </Typography>
        </WidgetWrapper>
    )
};

export default AdvertWidget;