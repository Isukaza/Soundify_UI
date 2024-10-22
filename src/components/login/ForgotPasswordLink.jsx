import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import {linkStyles} from "@/styles/login/styles.js";

export default function ForgotPasswordLink() {
    return (
        <Typography
            endDecorator={
                <Link href="#" level="title-sm" underline="none" color="neutral" sx={linkStyles}>
                    Forgot your password?
                </Link>
            }
            sx={{
                justifyContent: 'center',
                py: 2,
                fontSize: 'sm',
            }}
        />);
};