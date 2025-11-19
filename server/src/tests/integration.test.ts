import request from 'supertest';
import app from '../server';

describe('POST /api/v1/translate', () => {
    it('should return 200 and glyphs for valid input', async () => {
        const res = await request(app)
            .post('/api/v1/translate')
            .send({ text: 'hello' });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // h, e, l, l, o = 5 glyphs
        expect(res.body).toHaveLength(5);
        expect(res.body[0]).toHaveProperty('imageUrl');
    });

    it('should return 422 for empty string', async () => {
        const res = await request(app)
            .post('/api/v1/translate')
            .send({ text: '   ' }); // whitespace only

        expect(res.status).toBe(422);
    });

    it('should return 400 for invalid payload', async () => {
        const res = await request(app)
            .post('/api/v1/translate')
            .send({ nothing: 'here' }); // Missing 'text'

        expect(res.status).toBe(400);
    });
});