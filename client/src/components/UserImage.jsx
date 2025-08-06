import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage;

// This component is a placeholder for user images. It can be extended to include an <img> tag or other elements to display the user's image.
// The 'size' prop can be used to control the dimensions of the image, defaulting to "60px" if not specified.