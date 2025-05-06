import {Typography} from "@mui/joy";

import {formatTime} from "@/utils/formatters.js";
import {useStore} from '@/stores/index';

const TrackProgressTime = () => {
    console.log("TrackProgressTime");

    const currentTime = useStore((state) => state.player.currentTime);

    return <Typography style={{width: '50px'}}>{formatTime(currentTime)}</Typography>;
};

export default TrackProgressTime;