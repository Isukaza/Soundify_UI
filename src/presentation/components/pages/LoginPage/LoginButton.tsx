import {useNavigate} from "react-router-dom";

import {Button} from "@mui/joy";

import {useFetching} from "@/domain/hooks/useFetching";

import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import {useStore} from "@/stores";
import useInject from "@/domain/hooks/useInject";
import {TYPES} from "@/app/di/types";

interface Props {
    redirectTo: string;
}

export default function LoginButton({redirectTo}: Props) {
    const navigate = useNavigate();

    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);

    const [fetchAuth, isLoading] = useFetching(auth);

    async function auth() {
        const {email, setEmail, password, setPassword} = useStore.getState().auth;

        const success = await authManager.loginWithEmail(email, password);

        if (success) {
            setEmail("");
            setPassword("");
            navigate(redirectTo, {replace: true, state: {fromLogin: true}});
        }
    }

    return (
        <Button
            loading={isLoading}
            disabled={isLoading}
            size="lg"
            onClick={fetchAuth}
            sx={{
                width: "100%",
                mt: 1,
                ...borderRadiusStyle,
                "&:hover": {transform: "scale(1.1)"},
            }}
        >
            Log in
        </Button>
    );
}