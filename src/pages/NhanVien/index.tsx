import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import {
  enumToFilterData,
  ETrangThaiNhanVien,
  ETrangThaiNhanVienLabel,
} from '@/utils/enums';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import Form from './components/Form';

const NhanVienPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('nhanvien');
  const { danhSach: chucVuList } = useModel('danhmuc.chucvu');
  const { danhSach: phongBanList } = useModel('danhmuc.phongban');

  // Helper to get name by code
  const getChucVuName = (ma: string) => chucVuList?.find((cv: any) => cv.ma === ma)?.ten || ma;
  const getPhongBanName = (ma: string) => phongBanList?.find((pb: any) => pb.ma === ma)?.ten || ma;

  const handleDeleteWithValidation = (record: NhanVien.IRecord) => {
    if (record.trangThai !== ETrangThaiNhanVien.THU_VIEC) {
      message.error(`Chỉ có thể xóa nhân viên có trạng thái "${ETrangThaiNhanVienLabel[ETrangThaiNhanVien.THU_VIEC]}"`);
      return;
    }
    deleteModel(record._id, getModel);
  };

  const columns: IColumn<NhanVien.IRecord>[] = [
    {
      title: 'Mã',
      dataIndex: 'ma',
      width: 100,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Họ tên',
      dataIndex: 'ten',
      width: 200,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      width: 150,
      filterType: 'select',
      filterData: (chucVuList ?? []).map((cv: any) => ({ value: cv.ma, label: cv.ten })),
      sortable: true,
      render: (val) => getChucVuName(val),
    },
    {
      title: 'Phòng ban',
      dataIndex: 'phongBan',
      width: 150,
      filterType: 'select',
      filterData: (phongBanList ?? []).map((pb: any) => ({ value: pb.ma, label: pb.ten })),
      sortable: true,
      render: (val) => getPhongBanName(val),
    },
    {
      title: 'Lương',
      dataIndex: 'luong',
      width: 120,
      align: 'right',
      sortable: true,
      render: (val) => new Intl.NumberFormat('vi-VN').format(val) + ' ₫',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 120,
      filterType: 'select',
      filterData: enumToFilterData(ETrangThaiNhanVien, ETrangThaiNhanVienLabel),
      sortable: true,
      render: (val: ETrangThaiNhanVien) => ETrangThaiNhanVienLabel[val] ?? val,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'center',
      width: 140,
      filterType: 'datetime',
      sortable: true,
      render: (val) => moment(val).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (record: NhanVien.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => handleDeleteWithValidation(record)}
              title="Bạn có chắc chắn muốn xóa nhân viên này? (Chỉ có thể xóa nhân viên thử việc)"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="nhanvien"
      title="Nhân viên"
      Form={Form}
      buttons={{ import: true }}
    />
  );
};

export default NhanVienPage;
