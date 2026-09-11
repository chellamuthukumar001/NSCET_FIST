import { Request, Response } from 'express';
import { pool, isDbConnected } from '../config/db';

// In-memory fallback matching the user's manual local videos
let fallbackVideos = [
  {
    id: 'vid-local-01',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-01.mp4',
    title: 'federated learning',
    topic: 'federated learning',
    facultyName: 'asifa shereen CSE',
    departmentCode: 'CSE',
    academicYear: '2024-25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    description: 'Lecture on Federated Learning concepts, distributed machine learning architecture, and privacy-preserving model aggregation.',
    durationSeconds: 240,
    semester: 5,
    subjectCode: 'CS3551',
    subjectTitle: 'Distributed & Federated Systems',
    unitNumber: 3,
    viewCount: 1420,
    publishedDate: '2026-09-01',
    studyMaterialUrl: undefined as string | undefined,
    tags: ['Machine Learning', 'Federated Learning'],
  },
  {
    id: 'vid-local-02',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-02.mp4',
    title: 'web request',
    topic: 'web request',
    facultyName: 'asmath nabila CSE',
    departmentCode: 'CSE',
    academicYear: '2024-25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    description: 'Comprehensive walkthrough of HTTP/HTTPS web requests, client-server communication lifecycle, REST protocols, and response headers.',
    durationSeconds: 217,
    semester: 5,
    subjectCode: 'CS3452',
    subjectTitle: 'Web Technology & Networks',
    unitNumber: 2,
    viewCount: 1890,
    publishedDate: '2026-09-02',
    studyMaterialUrl: undefined as string | undefined,
    tags: ['Web Technology', 'HTTP', 'REST API'],
  },
];

export const listVideos = async (req: Request, res: Response): Promise<void> => {
  const { department, semester, unit, search } = req.query;

  try {
    if (isDbConnected) {
      let queryStr = 'SELECT * FROM videos WHERE 1=1';
      const params: any[] = [];

      if (department && department !== 'ALL') {
        queryStr += ' AND department_code = ?';
        params.push(department);
      }
      if (semester && semester !== 'ALL') {
        queryStr += ' AND semester = ?';
        params.push(Number(semester));
      }
      if (unit && unit !== 'ALL') {
        queryStr += ' AND unit_number = ?';
        params.push(Number(unit));
      }
      if (search && typeof search === 'string') {
        queryStr += ' AND (LOWER(title) LIKE ? OR LOWER(topic) LIKE ? OR LOWER(faculty_name) LIKE ?)';
        const searchPattern = `%${search.toLowerCase()}%`;
        params.push(searchPattern, searchPattern, searchPattern);
      }

      queryStr += ' ORDER BY created_at DESC';
      const [rows]: any = await pool.query(queryStr, params);

      if (Array.isArray(rows) && rows.length > 0) {
        const formatted = rows.map((r: any) => ({
          id: r.id,
          youtubeId: r.youtube_id || '',
          localVideoPath: r.local_video_path || undefined,
          title: r.title,
          topic: r.topic,
          facultyName: r.faculty_name,
          departmentCode: r.department_code,
          academicYear: r.academic_year,
          thumbnailUrl: r.thumbnail_url,
          studyMaterialUrl: r.study_material_url || undefined,
          description: r.description,
          durationSeconds: r.duration_seconds || 120,
          semester: r.semester,
          subjectCode: r.subject_code,
          subjectTitle: r.subject_title,
          unitNumber: r.unit_number,
          viewCount: r.view_count || 0,
          publishedDate: r.published_date,
          tags: r.tags ? (typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags) : ['Engineering', 'Lecture'],
        }));
        res.json({ count: formatted.length, data: formatted });
        return;
      }
    }
  } catch (err) {
    console.warn('[videoController] MySQL query failed, falling back to in-memory:', err);
  }

  // Fallback to in-memory store
  let result = [...fallbackVideos];
  if (department && department !== 'ALL') {
    result = result.filter(v => v.departmentCode === department);
  }
  if (semester && semester !== 'ALL') {
    result = result.filter(v => v.semester === Number(semester));
  }
  if (unit && unit !== 'ALL') {
    result = result.filter(v => v.unitNumber === Number(unit));
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.subjectTitle.toLowerCase().includes(q) ||
      v.facultyName.toLowerCase().includes(q)
    );
  }

  res.json({ count: result.length, data: result });
};

export const getVideoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (isDbConnected) {
      const [rows]: any = await pool.query('SELECT * FROM videos WHERE id = ?', [id]);
      if (Array.isArray(rows) && rows.length > 0) {
        const r = rows[0];
        res.json({
          id: r.id,
          youtubeId: r.youtube_id || '',
          localVideoPath: r.local_video_path || undefined,
          title: r.title,
          topic: r.topic,
          facultyName: r.faculty_name,
          departmentCode: r.department_code,
          academicYear: r.academic_year,
          thumbnailUrl: r.thumbnail_url,
          studyMaterialUrl: r.study_material_url || undefined,
          description: r.description,
          durationSeconds: r.duration_seconds || 120,
          semester: r.semester,
          subjectCode: r.subject_code,
          subjectTitle: r.subject_title,
          unitNumber: r.unit_number,
          viewCount: r.view_count || 0,
          publishedDate: r.published_date,
          tags: r.tags ? (typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags) : ['Engineering', 'Lecture'],
        });
        return;
      }
    }
  } catch (err) {
    console.warn('[videoController] MySQL getVideoById failed, falling back:', err);
  }

  const video = fallbackVideos.find(v => v.id === id);
  if (!video) {
    res.status(404).json({ error: 'Video lecture not found' });
    return;
  }

  res.json(video);
};

export const createVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      topicName,
      presentedBy,
      department,
      year,
      videoPath,
      thumbnailUrl,
      studyMaterialUrl,
      description
    } = req.body;

    if (!topicName || !presentedBy || !department || !year) {
      res.status(400).json({ error: 'Compulsory fields: topicName, presentedBy, department, year' });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const videoFile = files?.['videoFile']?.[0];
    const thumbnailFile = files?.['thumbnailFile']?.[0];
    const studyMaterialFile = files?.['studyMaterialFile']?.[0];

    const finalVideoPath = videoFile 
      ? `/uploads/videos/${videoFile.filename}` 
      : (videoPath || '/assets/videos/campusiq-01.mp4');

    const finalThumbnailUrl = thumbnailFile 
      ? `/uploads/thumbnails/${thumbnailFile.filename}` 
      : (thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800');

    const finalStudyMaterialUrl = studyMaterialFile 
      ? `/uploads/materials/${studyMaterialFile.filename}` 
      : (studyMaterialUrl || undefined);

    const newId = 'vid-' + Date.now().toString(36);
    const newVideo = {
      id: newId,
      youtubeId: '',
      localVideoPath: finalVideoPath,
      title: topicName,
      topic: topicName,
      facultyName: presentedBy,
      departmentCode: department,
      academicYear: year,
      thumbnailUrl: finalThumbnailUrl,
      studyMaterialUrl: finalStudyMaterialUrl,
      description: description || 'Manually uploaded video lecture.',
      durationSeconds: req.body.durationSeconds ? Number(req.body.durationSeconds) : 240,
      semester: 1,
      subjectCode: 'GEN',
      subjectTitle: 'General Engineering',
      unitNumber: 1,
      viewCount: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      tags: [department || 'Engineering', 'Lecture'],
    };

    // Save to MySQL if available
    if (isDbConnected) {
      await pool.query(`
        INSERT INTO videos (
          id, local_video_path, title, topic, faculty_name, department_code, academic_year,
          thumbnail_url, study_material_url, description, duration_seconds, semester,
          subject_code, subject_title, unit_number, view_count, published_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        newVideo.id,
        newVideo.localVideoPath,
        newVideo.title,
        newVideo.topic,
        newVideo.facultyName,
        newVideo.departmentCode,
        newVideo.academicYear,
        newVideo.thumbnailUrl,
        newVideo.studyMaterialUrl || null,
        newVideo.description,
        newVideo.durationSeconds,
        newVideo.semester,
        newVideo.subjectCode,
        newVideo.subjectTitle,
        newVideo.unitNumber,
        newVideo.viewCount,
        newVideo.publishedDate
      ]);
      console.log('✅ [MySQL] Inserted new video into MySQL:', newVideo.id);
    }

    // Also update in-memory fallback
    fallbackVideos.unshift(newVideo);

    res.status(201).json({ success: true, data: newVideo });
  } catch (error: any) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video', details: error.message });
  }
};


