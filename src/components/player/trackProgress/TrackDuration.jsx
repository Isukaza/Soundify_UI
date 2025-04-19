import {Typography} from "@mui/joy";

import {formatTime} from "@/utils/formatters.js";
import {useMusicStore} from '@/stores/useMusicStore/useMusicStore.ts';

const TrackDuration = () => {
    console.log("TrackDuration");

    const duration = useMusicStore((state) => state.duration);

    return <Typography style={{width: '50px'}}>{formatTime(duration)}</Typography>;
};

export default TrackDuration;