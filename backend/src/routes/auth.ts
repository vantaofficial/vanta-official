import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const db = await openDb();
    const user = await db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
    );

    if (user) {
        req.session.user = { id: user.id, username: user.username, role: user.role };
        return res.json({ success: true, user: { username: user.username, role: user.role } });
    }

    res.status(401).json({ error: 'Invalid credentials' });
});

router.post('/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ success: true });
    });
});

router.get('/session', (req: Request, res: Response) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});

export default router;