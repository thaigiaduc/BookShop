import './ManageUser.css';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import serviceForManageUser from '../../../Services/serviceForManageUser';
import { 
    Table, 
    Image, 
    Modal, 
    Form,
    Input,
    Radio,
    Select,
    Cascader,
    Button,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload, } from 'antd';
import  { Container, Row, Col, Dropdown } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageOrder = () => {
    const [allUser, setAllUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(false);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };

    const handleUpdateStatus = async (id, value) => {
        try{
            const res = await serviceForManageUser.updateUserStatus(id, value ? 0:1);
            const allUser = await serviceForManageUser.getAllUsers();
            setAllUser(allUser);
            alert('Edit success');
            
        }catch(error){
            console.log(error.response);
        }
    }

    useEffect(() => {
        const fetchUserList = async () => {
            const allUser = await serviceForManageUser.getAllUsers();
            setAllUser(allUser);
        };
      fetchUserList();
    }, []);
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Block User',
            dataIndex: 'block',
        }, 
    ];
    const data = [];
    if(allUser.length > 0){
        allUser.map((user) => {
            var dataItem = {
                key: user.id,
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                address: user.address,
                phone: user.phone,
                status: user.status ? (<label className='text-primary'>avalable</label>): (<label className='text-danger'>unavalable</label>),
                block: 
                <Button onClick={()=>handleUpdateStatus(user.id,user.status)}>
                    Change
                </Button>,
            }
            data.push(dataItem);
        }); 
    }
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


   
   
    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage User</h2>
            </Col>
         </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageOrder;