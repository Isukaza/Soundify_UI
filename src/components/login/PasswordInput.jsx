import {useState} from "react";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

// eslint-disable-next-line react/prop-types
export default function PasswordInput({setPass}) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <FormControl sx={{pb: 2}}>
            <FormLabel>
                <Typography level="title-sm" sx={{fontWeight: 'bold'}}>
                    Password
                </Typography>
            </FormLabel>
            <Input
                size='lg'
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                endDecorator={
                    <IconButton onClick={toggleShowPassword} variant="plain">
                        {
                            showPassword
                                ? <Visibility/>
                                : <VisibilityOff/>
                        }
                    </IconButton>
                }
            />
        </FormControl>);
};