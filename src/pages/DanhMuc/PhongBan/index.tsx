import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import Form from './components/Form';

const PhongBanPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('danhmuc.phongban');

  const columns: IColumn<PhongBan.IRecord>[] = [
    {
      title: 'Mã',
      dataIndex: 'ma',
      width: 80,
      filterType: 'select',
      filterData: ['PB01', 'PB02', 'PB03'],
      sortable: true,
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'ten',
      width: 250,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'center',
      width: 120,
      filterType: 'datetime',
      sortable: true,
      render: (val) => moment(val).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (record: PhongBan.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa phòng ban này?"
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
      modelName="danhmuc.phongban"
      title="Phòng ban"
      Form={Form}
      buttons={{ import: true }}
    />
  );
};

export default PhongBanPage;
