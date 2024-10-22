import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

export default function EmailInput() {
    return (
        <FormControl sx={{pb: 2}}>
            <FormLabel>
                <Typography level="title-sm" sx={{fontWeight: 'bold'}}>
                    Email
                </Typography>
            </FormLabel>
            <Input
                size='lg' name="email"
                type="email"
                placeholder="Email or username"
            />
        </FormControl>);
};