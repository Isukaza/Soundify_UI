import {useCallback, useEffect, useRef, useState} from "react";
import {Slider} from "@mui/joy";

import {useStore} from "@/stores";
import useInject from "@/presentation/hooks/useInject";

import {TYPES} from "@/app/di/types";
import AbstractAudioPlayerManager from "@/domain/Base/AbstractAudioPlayerManager";

import {formatTime} from "@/infrastructure/utils/formatters";

const TrackProgressSlider = () => {
    const manager = useInject<AbstractAudioPlayerManager>(TYPES.AudioPlayerManager);

    const currentTime = useStore((state) => state.player.currentTime);
    const currentTrack = useStore((state) => state.track.currentTrack);
    const duration = useStore((state) => state.player.duration);
    const isEnded = useStore((state) => state.player.isEnded);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const onFocusRef = useRef(false);

    const [currentSliderTime, setCurrentSliderTime] = useState(0);

    useEffect(() => {
        if (isEnded === true) setCurrentSliderTime(duration);
    }, [isEnded, duration]);

    const handleChangeSlider = useCallback(
        (_: unknown, value: number | number[]) => {
            if (typeof value === "number") {
                setCurrentSliderTime(value);
            }
        },
        []
    );

    const handleCommitted = useCallback(
        async (_: unknown, value: number | number[]) => {
            if (typeof value !== "number") return;

            try {
                await manager.setTime(value);
            } catch (err) {
                console.error("Failed to set time:", err);
            }

            const sliderDOM = sliderRef.current?.querySelector("input");
            sliderDOM?.blur();
        },
        [manager]
    );

    // adapter for MUI Slider format requirement
    const formatSliderLabel = (value: number) => formatTime(value);

    if (!currentTrack) return null;

    return (
        <Slider
            ref={sliderRef}
            valueLabelDisplay="on"
            sx={{
                "--Slider-thumbSize": "14px",
                "& .MuiSlider-track": {borderRadius: "8px"},
                "& .MuiSlider-thumb": {opacity: 0, transition: "opacity 0.3s"},
                "&:hover .MuiSlider-thumb": {opacity: 1},
                marginX: 2,
            }}
            min={0}
            max={duration}
            step={0.15}
            value={onFocusRef.current ? currentSliderTime : currentTime}
            onFocus={() => (onFocusRef.current = true)}
            onBlur={() => (onFocusRef.current = false)}
            onChange={handleChangeSlider}
            onChangeCommitted={handleCommitted}
            valueLabelFormat={formatSliderLabel}
            disabled={!currentTrack}
        />
    );
};

export default TrackProgressSlider;