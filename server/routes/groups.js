import express from 'express';

export default (db) => {
  const router = express.Router();

  // Get all groups
  router.get('/', async (req, res) => {
    try {
      const query = `
        SELECT g.*, 
               ay.name as academic_year_name,
               COUNT(s.id) as student_count
        FROM groups g
        JOIN academic_years ay ON g.academic_year_id = ay.id
        LEFT JOIN students s ON s.group_id = g.id
        WHERE ay.active = 1
        GROUP BY g.id
        ORDER BY g.created_at DESC
      `;
      
      const groups = await db.all(query);
      res.json(groups);
    } catch (err) {
      console.error('Error fetching groups:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create group
  router.post('/', async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    try {
      const activeYear = await db.get(
        'SELECT id FROM academic_years WHERE active = 1'
      );

      if (!activeYear) {
        return res.status(400).json({ error: 'No active academic year found' });
      }

      const { name } = req.body;
      
      const result = await db.run(
        'INSERT INTO groups (name, academic_year_id) VALUES (?, ?)',
        [name, activeYear.id]
      );

      const newGroup = await db.get(
        'SELECT * FROM groups WHERE id = ?',
        [result.lastID]
      );

      res.status(201).json(newGroup);
    } catch (err) {
      console.error('Error creating group:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update group
  router.put('/:id', async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);

    try {
      const { id } = req.params;
      const { name } = req.body;

      await db.run(
        'UPDATE groups SET name = ? WHERE id = ?',
        [name, id]
      );

      const updatedGroup = await db.get(
        'SELECT * FROM groups WHERE id = ?',
        [id]
      );

      if (!updatedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }

      res.json(updatedGroup);
    } catch (err) {
      console.error('Error updating group:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};