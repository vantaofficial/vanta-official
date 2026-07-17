import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const db = await openDb();
    const group = await db.get('SELECT * FROM groups WHERE id = 1');
    res.json(group || {});
});

router.put('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const { group_url, owner, name, members, verified, funds, description, shout } = req.body;
    const db = await openDb();
    await db.run(
        `UPDATE groups SET
            group_url = ?,
            owner = ?,
            name = ?,
            members = ?,
            verified = ?,
            funds = ?,
            description = ?,
            shout = ?
        WHERE id = 1`,
        [group_url, owner, name, members, verified, funds, description, shout]
    );

    res.json({ success: true });
});

export default router;