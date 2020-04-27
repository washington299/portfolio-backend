import dotenv from 'dotenv';
import path from 'path';
import app from './config/app';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

app.listen(3003, () => console.log('Server running on port 3003'));
