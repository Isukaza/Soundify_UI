import {useEffect} from 'react';
import {Box} from '@mui/joy';

import Player from '@/presentation/components/player/Player';
import {AudioPlayerManager} from '@/domain/managers/AudioPlayerManager';

const Footer = () => {
    const musicName = "tmpdob60llg";

    useEffect(() => {
        AudioPlayerManager.loadSource(musicName);
    }, []);

    return (
        <Box
            sx={{
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'black',
                color: 'white',
                boxShadow: '0px -1px 3px 0px rgba(255, 255, 255, 0.2)',
                position: 'relative'
            }}
        >
            <Player/>
        </Box>
    );
};

export default Footer;