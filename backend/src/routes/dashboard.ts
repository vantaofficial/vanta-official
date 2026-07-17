import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const db = await openDb();
    const totalAccounts = await db.get('SELECT COUNT(*) as count FROM hits');
    const totalVisits = await db.get('SELECT COUNT(*) as count FROM hits WHERE created_at > datetime("now", "-1 day")');
    const totalClicks = await db.get('SELECT SUM(value) as total FROM hits');

    res.json({
        accounts: totalAccounts.count || 0,
        visits: totalVisits.count || 0,
        clicks: totalClicks.total || 0,
        change: '+0%'
    });
});

router.get('/overview', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const db = await openDb();
    const summary = await db.get('SELECT SUM(summary) as total FROM hits');
    const rap = await db.get('SELECT SUM(rap) as total FROM hits');
    const balance = await db.get('SELECT SUM(value) as total FROM hits');

    res.json({
        summary: summary.total || 0,
        rap: rap.total || 0,
        balance: balance.total || 0
    });
});

export default router;