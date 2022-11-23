import './ManageOrder.css';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import serviceForManageOrder from '../../../Services/serviceForManageOrder';
import { 
    Table, 
    Image, 
    Modal, 
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload, } from 'antd';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageOrder = () => {
    const [allOrder, setAllOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(false);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };


    useEffect(() => {
        const fetchProductList = async () => {
            const allOrder = await serviceForManageOrder.getOrderAdmin();
            setAllOrder(allOrder);
        };
      fetchProductList();
    }, []);
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
            title: 'user',
            dataIndex: 'user',
        },
        {
            title: 'amount',
            dataIndex: 'amount',
        },
        {
            title: 'date',
            dataIndex: 'date',
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Update',
            dataIndex: 'update',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
        },
    ];
    const data = [];
    allOrder.map((order) => {
        var dataItem = {
            key: order.id,
            id: order.id,
            user: order.user_id,
            amount: order.order_amount,
            date: order.order_date,
            status: order.order_status,
            update: 
            <>
            <Dropdown>
            <Dropdown.Toggle variant="secondary">
                         {order.status ? 'Accepted': 'Awaitting accept'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item  eventKey="1">Awaiting accept</Dropdown.Item>
                      <Dropdown.Item  eventKey="2">Accepted</Dropdown.Item>
                      <Dropdown.Item  eventKey="3">Shipped</Dropdown.Item>
                      <Dropdown.Item  eventKey="4">Cancelled</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
            <Button type="text" icon={<SettingOutlined />} >
            </Button>
            </>,
            detail: 
            <Button type="text" icon={<SettingOutlined />} >
            </Button>,
        }
        data.push(dataItem);
    }); 
        

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


   
   
    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Book</h2>
            </Col>
         </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageOrder;