import { Router } from 'express';


export const router = Router();

router.post('/greet', (req, res) => {
    const { user } =  req.body;
    
    res.json({message: `Hello ${user}`});
})

export default router;