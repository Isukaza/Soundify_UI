import {Stack, Button} from '@mui/joy';
import {useNavigate} from 'react-router-dom';

export default function SectionNavigation() {
    const navigate = useNavigate();

    return (
        <Stack direction="row" spacing={1} sx={{mb: 2}}>
            <Button onClick={() => navigate('/')}>Track</Button>
            <Button onClick={() => navigate('/Album')}>Album</Button>
            <Button onClick={() => navigate('/Artist')}>Artist</Button>
        </Stack>
    );
}