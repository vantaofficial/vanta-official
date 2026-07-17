import { Router, Request, Response } from 'express';
import { openDb } from '../database';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const db = await openDb();
    const profile = await db.get('SELECT * FROM profile WHERE id = 1');
    res.json(profile || {});
});

router.put('/', async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

    const { real_username, fake_username, display_name, premium, friends, followers, followings, status, creation_date, description } = req.body;
    const db = await openDb();
    await db.run(
        `UPDATE profile SET
            real_username = ?,
            fake_username = ?,
            display_name = ?,
            premium = ?,
            friends = ?,
            followers = ?,
            followings = ?,
            status = ?,
            creation_date = ?,
            description = ?
        WHERE id = 1`,
        [real_username, fake_username, display_name, premium, friends, followers, followings, status, creation_date, description]
    );

    res.json({ success: true });
});

export default router;