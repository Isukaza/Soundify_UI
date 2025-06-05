import {Box} from '@mui/joy';

import Player from '@/presentation/components/player/Player';

const Footer = () => {
    return (
        <Box sx={{
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '0px -1px 3px 0px rgba(255, 255, 255, 0.2)',
            position: 'relative'
        }}>
            <Player/>
        </Box>
    );
};

export default Footer;