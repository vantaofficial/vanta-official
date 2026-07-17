import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import './types';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import hitsRoutes from './routes/hits';
import settingsRoutes from './routes/settings';
import profileRoutes from './routes/profile';
import groupRoutes from './routes/group';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'vanta-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/hits', hitsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/group', groupRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'online', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🔥 VANTA Backend running on http://localhost:${PORT}`);
});