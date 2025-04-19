import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import GoogleIcon from '@/assets/GoogleIcon.jsx';

import { borderRadiusStyle } from "@/styles/common/borderRadiusStyle.js";
import AuthApi from "@/api/AuthApi.js";
import { useFetching } from "@/hooks/useFetching.js";

export default function GoogleLoginButton() {
    const [fetchAuth] = useFetching(auth);

    async function auth() {
        let resp = await AuthApi.GetLoginGoogleSsoURL();
        if (resp.status) {
            window.location.href = resp.data;
        }
    }

    return (
        <Button
            onClick={async () => await fetchAuth()}
            size='lg'
            variant="outlined"
            sx={borderRadiusStyle}>
            <Typography level="title-sm" sx={{fontWeight: 'bold'}} startDecorator={<GoogleIcon/>}>
                Continue with Google
            </Typography>
        </Button>
    );
};