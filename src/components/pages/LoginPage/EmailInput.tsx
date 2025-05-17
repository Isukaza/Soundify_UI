import {Input, FormControl, FormLabel, Typography} from '@mui/joy';
import {useStore} from "@/stores";
import React, {useRef, useCallback} from 'react';

export default function EmailInput() {
    console.log("Email Input");

    const email = useStore(state => state.auth.email);
    const setEmail = useStore.getState().auth.setEmail;

    const prevEmailRef = useRef(email);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;

        if (prevEmailRef.current !== newEmail) {
            setEmail(newEmail);
            prevEmailRef.current = newEmail;
        }
    }, [setEmail]);

    return (
        <FormControl sx={{pb: 2}}>
            <FormLabel>
                <Typography level="title-sm" sx={{fontWeight: 'bold'}}>
                    Email
                </Typography>
            </FormLabel>
            <Input
                size="lg"
                value={email}
                onChange={handleChange}
                placeholder="Email or username"
            />
        </FormControl>
    );
}