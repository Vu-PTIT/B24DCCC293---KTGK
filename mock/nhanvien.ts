import { Request, Response } from 'express';

let nhanVienData: any[] = [
  {
    _id: 'nv1',
    ma: 'NV001',
    ten: 'Nguyễn Văn An',
    chucVu: 'CV01',
    phongBan: 'PB01',
    luong: 15000000,
    trangThai: 'da-ky',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    _id: 'nv2',
    ma: 'NV002',
    ten: 'Trần Thị Bình',
    chucVu: 'CV03',
    phongBan: 'PB02',
    luong: 8000000,
    trangThai: 'thu-viec',
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
  },
  {
    _id: 'nv3',
    ma: 'NV003',
    ten: 'Lê Minh Cường',
    chucVu: 'CV02',
    phongBan: 'PB01',
    luong: 12000000,
    trangThai: 'da-ky',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    _id: 'nv4',
    ma: 'NV004',
    ten: 'Phạm Thu Hương',
    chucVu: 'CV03',
    phongBan: 'PB03',
    luong: 9500000,
    trangThai: 'nghi-phep',
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-01').toISOString(),
  },
  {
    _id: 'nv5',
    ma: 'NV005',
    ten: 'Hoàng Đức Minh',
    chucVu: 'CV04',
    phongBan: 'PB04',
    luong: 5000000,
    trangThai: 'thu-viec',
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date('2024-03-15').toISOString(),
  },
];

function paginate(data: any[], page: number, limit: number) {
  const total = data.length;
  const result = data.slice((page - 1) * limit, page * limit);
  return { result, total };
}

export default {
  'GET /nhan-vien/page': (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { result, total } = paginate(nhanVienData, page, limit);
    res.json({ data: { result, total }, success: true });
  },

  'GET /nhan-vien/many': (req: Request, res: Response) => {
    res.json({ data: nhanVienData, success: true });
  },

  'GET /nhan-vien/:id': (req: Request, res: Response) => {
    const item = nhanVienData.find((d) => d._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ data: item, success: true });
  },

  'POST /nhan-vien': (req: Request, res: Response) => {
    const newItem = {
      _id: 'nv' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    nhanVienData.push(newItem);
    res.json({ data: newItem, success: true });
  },

  'PUT /nhan-vien/:id': (req: Request, res: Response) => {
    const idx = nhanVienData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    nhanVienData[idx] = { ...nhanVienData[idx], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ data: nhanVienData[idx], success: true });
  },

  'DELETE /nhan-vien/:id': (req: Request, res: Response) => {
    const idx = nhanVienData.findIndex((d) => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy' });
    nhanVienData.splice(idx, 1);
    res.json({ data: {}, success: true });
  },
};
