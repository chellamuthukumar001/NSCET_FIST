import { Request, Response } from 'express';
import { pool, isDbConnected } from '../config/db';

export const syncUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email, name, avatarUrl, departmentName, departmentId, program, semester, studentId, batch } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required for user synchronization' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name || cleanEmail.split('@')[0];
    const userId = id || ('usr_' + Date.now().toString(36));

    // STRICT ROLE ENFORCEMENT:
    // Only admincampusiq@gmail.com is granted ADMIN role.
    // All other accounts are strictly STUDENT.
    const role = cleanEmail === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT';
    const dept = departmentName || 'Computer Science & Engineering';
    const deptId = departmentId || 'dept_cse';
    const prog = program || (role === 'ADMIN' ? 'Administration' : 'B.E. Computer Science & Engineering');
    const sem = semester !== undefined ? semester : (role === 'ADMIN' ? 0 : 5);
    const studId = role === 'ADMIN' ? null : (studentId || '921022104042');
    const userBatch = batch || '2022-2026';

    let savedUser = {
      id: userId,
      email: cleanEmail,
      name: cleanName,
      role,
      avatarUrl: avatarUrl || null,
      departmentId: deptId,
      departmentName: dept,
      studentId: studId,
      program: prog,
      semester: sem,
      batch: userBatch,
    };

    if (isDbConnected) {
      await pool.query(
        `INSERT INTO users (
          id, email, name, role, avatar_url, department_name, department_id, program, semester, student_id, batch
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          role = VALUES(role),
          avatar_url = VALUES(avatar_url),
          department_name = VALUES(department_name),
          department_id = VALUES(department_id),
          program = VALUES(program),
          semester = VALUES(semester),
          student_id = VALUES(student_id),
          batch = VALUES(batch)`,
        [userId, cleanEmail, cleanName, role, avatarUrl || null, dept, deptId, prog, sem, studId, userBatch]
      );

      console.log(`✅ [MySQL] User synchronized into database: ${cleanEmail} (${role})`);
    } else {
      console.warn('[MySQL] Database offline, user kept in memory');
    }

    res.json({
      success: true,
      message: 'User synchronized successfully',
      data: savedUser,
    });
  } catch (err: any) {
    console.error('Error syncing user:', err);
    res.status(500).json({ error: 'Failed to sync user to database', details: err.message });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email query parameter required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDbConnected) {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
      if (Array.isArray(rows) && rows.length > 0) {
        const u = rows[0];
        res.json({
          success: true,
          data: {
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            avatarUrl: u.avatar_url,
            departmentId: u.department_id,
            departmentName: u.department_name,
            studentId: u.student_id,
            program: u.program,
            semester: u.semester,
            batch: u.batch,
            createdAt: u.created_at,
          },
        });
        return;
      }
    }

    // Default response if not in DB yet
    const role = cleanEmail === 'admincampusiq@gmail.com' ? 'ADMIN' : 'STUDENT';
    res.json({
      success: true,
      data: {
        id: 'usr_' + Date.now().toString(36),
        email: cleanEmail,
        name: cleanEmail.split('@')[0],
        role,
        avatarUrl: null,
        departmentId: 'dept_cse',
        departmentName: 'Computer Science & Engineering',
        studentId: role === 'ADMIN' ? null : '921022104042',
        program: role === 'ADMIN' ? 'Administration' : 'B.E. Computer Science & Engineering',
        semester: role === 'ADMIN' ? 0 : 5,
        batch: '2022-2026',
      },
    });
  } catch (err: any) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
  }
};
