import './order.css';
import React,{ useEffect,useState } from 'react';
import {Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Error404 from '../404/404';
import { Route } from "react-router";
import servicesForOrder from '../../Services/servicesForOrder';
import { Space, Table, Tag } from 'antd';
import { 
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
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined, } from '@ant-design/icons';
const Order = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [order, setOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [edit,setEdit] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [idDetails, setIdDetails] = useState(0);
    // const [dataDetails, setDataDetails] = useState({
    //     id: "",
    //     order_id: "",
    //     book_id: "",
    //     quantity: "",
    //     price: "",
    // });
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };
    useEffect(() => {
        const fetchOrderData = async ()=> {
            const userLogin = sessionStorage.getItem('userLogin');
            if(userLogin){
                setIsLogin(true);
                const orders = await servicesForOrder.getOrder();
                setOrder(orders.data);
                console.log(orders);
            }
        }
       fetchOrderData()
    }, []);

    useEffect(() => {
        const fetchOrderDetailsData = async ()=> {
            const userLogin = sessionStorage.getItem('userLogin');
            if(userLogin){
                setIsLogin(true);
                const orderDetails = await servicesForOrder.getOrderDetail(idDetails);
                setOrderDetail(orderDetails.data);
            }
        }
       fetchOrderDetailsData()
    }, [idDetails]);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
        },
        {
            title: 'Order Amount',
            dataIndex: 'order_amount',
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
        },
        {
            title: 'Details',
            dataIndex: 'Details',
        },
    ];

    const columnsDetails = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Order Id',
            dataIndex: 'order_id',
        },
        {
            title: 'Book',
            dataIndex: 'book_title',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleModal = (id) => {
        setIdDetails(id);
        console.log(id);
        setOpen(true);
    }
    const data = [];
    if(order.length !== 0) {
        order.map((or) => {
            var dataItem = {
                key: or.id,
                id: or.id,
                order_date: or.order_date,
                order_amount: or.order_amount,
                order_status: or.order_status,
                Details: <Button type="text" onClick={() => handleModal(or.id)} icon={<SettingOutlined />} >
                </Button>,
            }
            data.push(dataItem);
        });   
    }

    const dataDetails = [];
    if(orderDetail.length !== 0) {
        orderDetail.map((ord) => {
            var dataItemDetails = {
                key: ord.id,
                id: ord.id,
                order_id: ord.order_id,
                book_title: ord.book_title,
                quantity: ord.quantity,
                price: ord.price,
            }
            dataDetails.push(dataItemDetails);
        });   
    }
    return (
        <section>
        { isLogin ? 
            (
                <div className="row" style={{marginBottom: '500px'}}>
                    <Col>
                        <div className="col-xxl-8 mb-5 mb-xxl-0">		        
							<h4 className="mb-4 mt-0">Order detail</h4>
							<Table columns={columns} dataSource={data} onChange={onChange} />; 
                        </div>
                    </Col>
                </div>
            ):(
                <Error404 />
            )}
            <Modal
                title="Order Details"
                open={open}               
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >      
                <Table columns={columnsDetails} dataSource={dataDetails} onChange={onChange} />; 
            </Modal>
        </section>
    );
}
export default Order;