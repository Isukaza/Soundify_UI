import {Typography} from "@mui/joy";

import {formatTime} from "@/utils/formatters.js";
import {useMusicStore} from '@/stores/useMusicStore/useMusicStore.ts';

const TrackProgressTime = () => {
    console.log("TrackProgressTime");

    const currentTime = useMusicStore((state) => state.currentTime);

    return <Typography style={{width: '50px'}}>{formatTime(currentTime)}</Typography>;
};

export default TrackProgressTime;