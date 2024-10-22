import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { VisibilityOff } from "@mui/icons-material";

export default function PasswordInput() {
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
                type="password"
                placeholder="Password"
                endDecorator={
                    <IconButton variant="plain">
                        <VisibilityOff/>
                    </IconButton>
                }
            />
        </FormControl>);
};