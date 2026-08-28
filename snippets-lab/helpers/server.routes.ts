// routes/user.routes.ts
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
	res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
	res.json({ message: 'Create user' });
});

export default router;