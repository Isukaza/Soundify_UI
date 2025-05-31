import {CircularProgress} from '@mui/joy';

export default function LoadingPage() {
    return (
        <main
            className="main-container"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress/>
        </main>
    );
}