import dayjs from "dayjs";
import {useAuthStore} from "@/stores/useAuthStore.js";

const useAuthTokenValidator = () => {
    const {jwt, refresh, exp} = useAuthStore();

    return () => {
        if (!jwt || jwt.trim().length === 0 || !refresh || refresh.trim().length === 0)
            return false;

        const now = dayjs();
        const expirationDate = dayjs(exp * 1000);

        return exp !== 0 || expirationDate.isAfter(now);
    };
};

export default useAuthTokenValidator;
