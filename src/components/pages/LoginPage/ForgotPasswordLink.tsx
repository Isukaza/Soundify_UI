import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography} from '@mui/joy';

export default function ForgotPasswordLink() {
    return (
        <Typography
            endDecorator={
                <Link
                    component={RouterLink}
                    to="/InDevelop"
                    level="title-sm"
                    underline="none"
                    color="neutral"
                >
                    Forgot your password?
                </Link>
            }
            sx={{
                justifyContent: 'center',
                py: 2,
                fontSize: 'sm',
            }}
        />
    );
};