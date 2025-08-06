import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widget/UserWidget';

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); //hook from material-ui to check screen size
    const { _id, picturePath } = useSelector((state) => state.user );

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined }>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined }
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >

                </Box>
                
                {/* ONLY SHOW UP ON DESKTOP SCREENS */}
                {isNonMobileScreens && ( 
                    <Box flexBasis="26%">
                        {/* Other widgets can go here */}

                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;