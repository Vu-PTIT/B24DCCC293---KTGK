import { Request, Response } from 'express';

// ============ PHONG BAN ============
let phongBanData: any[] = [
  { _id: 'pb1', ma: 'PB01', ten: 'Phòng Kỹ thuật', createdAt: new Date('2024-01-10').toISOString() },
  { _id: 'pb2', ma: 'PB02', ten: 'Phòng Nhân sự', createdAt: new Date('2024-01-11').toISOString() },
  { _id: 'pb3', ma: 'PB03', ten: 'Phòng Kế toán', createdAt: new Date('2024-01-12').toISOString() },
  { _id: 'pb4', ma: 'PB04', ten: 'Phòng Marketing', createdAt: new Date('2024-02-01').toISOString() },
];

// ============ CHUC VU ============
let chucVuData: any[] = [
  { _id: 'cv1', ma: 'CV01', ten: 'Trưởng phòng', createdAt: new Date('2024-01-10').toISOString() },
  { _id: 'cv2', ma: 'CV02', ten: 'Phó phòng', createdAt: new Date('2024-01-11').toISOString() },
  { _id: 'cv3', ma: 'CV03', ten: 'Nhân viên', createdAt: new Date('2024-01-12').toISOString() },
  { _id: 'cv4', ma: 'CV04', ten: 'Thực tập sinh', createdAt: new Date('2024-02-01').toISOString() },
];

// Helper: paginate + filter
function paginate(data: any[], page: number, limit: number) {
  const total = data.length;
  const result = data.slice((page - 1) * limit, page * limit);
  return { result, total };
}

export default {
  // ========== PHONG BAN ==========
  'GET /phong-ban/page': (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { result, total } = paginate(phongBanData, page, limit);
    res.json({ data: { result, total }, success: true });
  },

  'GET /phong-ban/many': (req: Request, res: Response) => {
    res.json({ data: phongBanData, success: true });
  },

  'GET /phong-ban/:id': (req: Request, res: Response) => {
    const item = phongBanData.find((d) => d._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ data: item, success: true });
  },

  'POST /phong-ban': (req: Request, res: Response) => {
    const newItem = {
      _id: 'pb' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    phongBanData.push(newItem);
    res.json({ data: newItem, success: true });
  },

  'PUT /phong-ban/:id': (req: Request, res: Response) => {
    const idx = phongBanData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    phongBanData[idx] = { ...phongBanData[idx], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ data: phongBanData[idx], success: true });
  },

  'DELETE /phong-ban/:id': (req: Request, res: Response) => {
    const idx = phongBanData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    phongBanData.splice(idx, 1);
    res.json({ data: {}, success: true });
  },

  // ========== CHUC VU ==========
  'GET /chuc-vu/page': (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { result, total } = paginate(chucVuData, page, limit);
    res.json({ data: { result, total }, success: true });
  },

  'GET /chuc-vu/many': (req: Request, res: Response) => {
    res.json({ data: chucVuData, success: true });
  },

  'GET /chuc-vu/:id': (req: Request, res: Response) => {
    const item = chucVuData.find((d) => d._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ data: item, success: true });
  },

  'POST /chuc-vu': (req: Request, res: Response) => {
    const newItem = {
      _id: 'cv' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    chucVuData.push(newItem);
    res.json({ data: newItem, success: true });
  },

  'PUT /chuc-vu/:id': (req: Request, res: Response) => {
    const idx = chucVuData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    chucVuData[idx] = { ...chucVuData[idx], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ data: chucVuData[idx], success: true });
  },

  'DELETE /chuc-vu/:id': (req: Request, res: Response) => {
    const idx = chucVuData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    chucVuData.splice(idx, 1);
    res.json({ data: {}, success: true });
  },
};
