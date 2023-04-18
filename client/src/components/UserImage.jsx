import { Box } from '@mui/material';

const UserImage = ({ image, size ="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%", boxShadow: "0px 3px 6px rgba(0, 0, 0, 1)"}}
                
                width={size}
                height={size}
                alt='user'
                src={`http://localhost:8000/assets/${image}`}
            
            />

        </Box>
    )


}

export default UserImage;