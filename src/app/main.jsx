import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {CssVarsProvider, StyledEngineProvider} from '@mui/joy/styles';

import App from './App.jsx';
import '../presentation/styles/App.css';
import '../presentation/styles/index.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StyledEngineProvider injectFirst>
            <CssVarsProvider defaultMode={"dark"}>
                <App/>
            </CssVarsProvider>
        </StyledEngineProvider>
    </BrowserRouter>
);