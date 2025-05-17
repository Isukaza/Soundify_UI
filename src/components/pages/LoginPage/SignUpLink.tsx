import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/joy';

export default function SignUpLink()  {
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
                    Sign up for Soundtify
                </Link>
            }
            sx={{
                fontSize: 'sm',
                alignSelf: 'center',
            }}
        >
            Don&apos;t have an account?
        </Typography>
    );
};