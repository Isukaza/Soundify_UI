import useInject from "@/domain/hooks/useInject";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import {useCallback, useEffect, useRef, useState} from 'react';

import {formatTime} from '@/infrastructure/utils/formatters';
import {useStore} from '@/stores/index';

import {Slider} from '@mui/joy';

const TrackProgressSlider = () => {
    console.log("TrackProgressSlider");

    const currentTime = useStore((state) => state.player.currentTime);
    const currentTrack = useStore(state => state.library.currentTrack);
    const duration = useStore((state) => state.player.duration);
    const isEnded = useStore((state) => state.player.isEnded);

    const {instance: manager, loading} = useInject(AbstractAudioPlayerManager);

    const sliderRef = useRef(null);
    const onFocusRef = useRef(false);

    const [currentSliderTime, setCurrentSliderTime] = useState(0);

    useEffect(() => {
        if (isEnded === true)
            setCurrentSliderTime(duration);
    }, [isEnded]);

    const handleChangeSlider = useCallback((_, value) => {
        console.log("TrackProgressSlider handleChangeSlider", value);
        setCurrentSliderTime(value);
    }, []);

    const handleCommited = useCallback(async (_, value) => {
        console.log("TrackProgressSlider handleCommited", value);
        if (!manager)
            return;

        try {
            await manager.setTime(value);
        } catch (err) {
            console.error("Failed to set time:", err);
        }

        const sliderDOM = sliderRef.current?.querySelector('input');
        if (sliderDOM)
            sliderDOM.blur();

    }, [manager]);

    return (
        <Slider
            ref={sliderRef}
            valueLabelDisplay="on"
            sx={{
                "--Slider-thumbSize": "14px",
                '& .MuiSlider-track': {borderRadius: '8px'},
                '& .MuiSlider-thumb': {opacity: 0, transition: 'opacity 0.3s'},
                '&:hover .MuiSlider-thumb': {opacity: 1},
                marginX: 2
            }}
            min={0}
            max={duration}
            step={0.15}
            value={onFocusRef.current ? currentSliderTime : currentTime}
            onFocus={() => onFocusRef.current = true}
            onBlur={() => onFocusRef.current = false}
            onChange={handleChangeSlider}
            onChangeCommitted={handleCommited}
            valueLabelFormat={formatTime}
            disabled={loading || !manager || !currentTrack}
        />
    );
};

export default TrackProgressSlider;