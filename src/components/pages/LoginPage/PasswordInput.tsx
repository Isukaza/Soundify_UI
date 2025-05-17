import {useState, useRef, useCallback} from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, FormLabel, IconButton, Input, Typography} from '@mui/joy';
import {useStore} from "@/stores";
import React from 'react';

export default function PasswordInput() {
    console.log("Password Input");

    const password = useStore(state => state.auth.password);
    const setPassword = useStore.getState().auth.setPassword;

    const [showPassword, setShowPassword] = useState(false);

    const prevPasswordRef = useRef(password);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;

        if (prevPasswordRef.current !== newPassword) {
            setPassword(newPassword);
            prevPasswordRef.current = newPassword;
        }
    }, [setPassword]);

    return (
        <FormControl sx={{pb: 2}}>
            <FormLabel>
                <Typography level="title-sm" sx={{fontWeight: 'bold'}}>
                    Password
                </Typography>
            </FormLabel>
            <Input
                size="lg"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                placeholder="Password"
                endDecorator={
                    <IconButton onClick={() => setShowPassword(!showPassword)} variant="plain">
                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                }
            />
        </FormControl>
    );
}