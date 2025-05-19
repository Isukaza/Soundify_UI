import {Typography} from "@mui/joy";

import {formatTime} from "@/infrastructure/utils/formatters.js";
import {useStore} from '@/stores/index';

const TrackDuration = () => {
    console.log("TrackDuration");

    const duration = useStore(state => state.player.duration);

    return <Typography style={{width: '50px'}}>{formatTime(duration)}</Typography>;
};

export default TrackDuration;