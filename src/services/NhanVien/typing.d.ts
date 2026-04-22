declare module NhanVien {
  export interface IRecord {
    _id: string;
    ma: string;
    ten: string;
    chucVu: string; // Ma chuc vu
    phongBan: string; // Ma phong ban
    luong: number;
    trangThai: 'thu-viec' | 'da-ky' | 'nghi-phep' | 'da-thoi-viec';
    createdAt?: string;
    updatedAt?: string;
  }
}
