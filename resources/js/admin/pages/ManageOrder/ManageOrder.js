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
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [allOrderItems, setAllOrderItems] = useState([]);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };


    useEffect(() => {
        const fetchProductList = async () => {
            const allOrder = await serviceForManageOrder.getOrderAdmin();
            setAllOrder(allOrder.data);
        };
      fetchProductList();
    }, []);
    const handleShowDetail = async(id) =>{
        const res = await serviceForManageOrder.getOrderDetail(id);
         await setAllOrderItems(res.data);
         await setShowOrderDetail(true);
         
    }
    const handleBack = () =>{
        setShowOrderDetail(false);
    }
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
    const columns2 = [
        {
          title: 'order_id',
          dataIndex: 'id',
        },
        {
            title: 'book',
            dataIndex: 'book',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'price',
            dataIndex: 'price',
        },
    ];
    const data = [];
    if(!showOrderDetail)
    allOrder.map((order) => {
        var dataItem = {
            key: order.id,
            id: order.id,
            user: order.user_id,
            amount: order.order_amount,
            date: order.order_date,
            status: order.order_status,
            update: 
            <Dropdown>
            <Dropdown.Toggle variant="secondary">
                         {order.order_status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleUpdateStatus(order.id,1)}  eventKey="1">Awaiting accept</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleUpdateStatus(order.id,2)}  eventKey="2">Accepted</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleUpdateStatus(order.id,3)} eventKey="3">Shipped</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleUpdateStatus(order.id,4)} eventKey="4">Cancelled</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>,
            detail: 
            <Button onClick={()=>handleShowDetail(order.id)} type="text" icon={<SettingOutlined />} >
            </Button>,
        }
        data.push(dataItem);
    }); 
    else {
        allOrderItems.map((orderItem) => {
            var dataItem = {
                key: orderItem.order_id,
                id: orderItem.order_id,
                orderID: orderItem.order_id,
                book: orderItem.book_title,
                quantity: orderItem.quantity,
                price: orderItem.price,

            }
            data.push(dataItem);
        }); 
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleUpdateStatus = async (id, value) => {
        try{
            const res = await serviceForManageOrder.updateOrderStatus(id, value);
            const allOrder = await serviceForManageOrder.getOrderAdmin();
            setAllOrder(allOrder.data);
            alert('Edit update success');
        }catch(error){

        }
    }
   
   
    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Order</h2>
            </Col>
            <Col> <Button type="primary" onClick={()=>handleBack()} hidden={!showOrderDetail ? true : false} >Back</Button></Col>
         </Row>
        <Table columns={showOrderDetail ? columns2 : columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageOrder;