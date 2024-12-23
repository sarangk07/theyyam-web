import { verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || ''; 

export function authenticateToken(handler) {
    return async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ error: 'Authentication required' });
            }

            const decoded = verify(token, SECRET_KEY);
            req.user = decoded;
            
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}