import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const db = await openDb();
    const settings = await db.get('SELECT * FROM settings WHERE id = 1');
    res.json(settings || {});
});

router.put('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const { domain, site_id, site_code, webhook_url, auth_enabler, age_changer } = req.body;
    const db = await openDb();
    await db.run(
        `UPDATE settings SET
            domain = ?,
            site_id = ?,
            site_code = ?,
            webhook_url = ?,
            auth_enabler = ?,
            age_changer = ?
        WHERE id = 1`,
        [domain, site_id, site_code, webhook_url, auth_enabler, age_changer]
    );

    res.json({ success: true });
});

router.get('/domains', (req: Request, res: Response) => {
    res.json({
        domains: [
            { name: 'roblox.com.am', rating: 5.0 },
            { name: 'roblox.com.ml', rating: 5.0 },
            { name: 'robiox.com.py', rating: 5.0 }
        ]
    });
});

export default router;