import {Typography} from "@mui/joy";
import {formatTime} from "@/infrastructure/utils/formatters";
import {useStore} from '@/stores/index';

const TrackDuration = () => {
    console.log("TrackDuration");

    const duration = useStore(state => state.player.duration);
    const currentTrack = useStore(state => state.track.currentTrack);
    if (!currentTrack)
        return null;

    return <Typography style={{width: '50px'}}>{formatTime(duration)}</Typography>;
};

export default TrackDuration;