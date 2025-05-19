import {useCallback, useEffect, useRef, useState} from 'react';

import {AudioPlayerManager} from '@/domain/managers/AudioPlayerManager';
import {formatTime} from '@/infrastructure/utils/formatters';
import {useStore} from '@/stores/index';

import {Slider} from '@mui/joy';

const TrackProgressSlider = () => {
    console.log("TrackProgressSlider");

    const currentTime = useStore((state) => state.player.currentTime);
    const duration = useStore((state) => state.player.duration);
    const isEnded = useStore((state) => state.player.isEnded);

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

    const handleCommited = useCallback((_, value) => {
        console.log("TrackProgressSlider handleCommited", value);

        AudioPlayerManager.setTime(value);

        const sliderDOM = sliderRef.current?.querySelector('input');
        if (sliderDOM) {
            sliderDOM.blur();
        }
    }, []);

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
        />
    );
};

export default TrackProgressSlider;