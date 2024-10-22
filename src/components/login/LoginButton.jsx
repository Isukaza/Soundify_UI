import Button from '@mui/joy/Button';
import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle.js";

export default function LoginButton() {
    return (
        <Button
            size='lg'
            sx={{
                width: '100%',
                mt: 1,
                ...borderRadiusStyle,
                [`&:hover`]: {transform: 'scale(1.1)'}
            }}
        >
            Log in
        </Button>
    );
};