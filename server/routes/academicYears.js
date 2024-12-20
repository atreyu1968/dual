import express from 'express';

export default (db) => {
  const router = express.Router();

  // Get all academic years
  router.get('/', async (req, res) => {
    try {
      const years = await db.all('SELECT * FROM academic_years ORDER BY start_date DESC');
      res.json(years);
    } catch (err) {
      console.error('Error fetching academic years:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create academic year
  router.post('/', async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    const { name, start_date, end_date } = req.body;

    try {
      const result = await db.run(
        `INSERT INTO academic_years (name, start_date, end_date)
         VALUES (?, ?, ?)`,
        [name, start_date, end_date]
      );

      const newYear = await db.get(
        'SELECT * FROM academic_years WHERE id = ?',
        [result.lastID]
      );

      res.status(201).json(newYear);
    } catch (err) {
      console.error('Error creating academic year:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};