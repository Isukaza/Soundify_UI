import {Box, Input} from '@mui/joy';
import {Search} from "@mui/icons-material";

import Logo from '@/components/common/Logo';

const Header = () => {
    return (
        <Box
            sx={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 1px 3px 0px rgba(255, 255, 255, 0.1)'
            }}
        >
            <Logo/>

            <Input
                placeholder="What do you want to play?"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderRadius: '20px',
                    paddingX: '10px',
                    flexGrow: 1,
                    maxWidth: '500px',
                    marginLeft: '20px',
                }}
                startDecorator={
                    <Search fontSize="large"/>
                }
            />

            <Logo/>
        </Box>
    );
};

export default Header;
