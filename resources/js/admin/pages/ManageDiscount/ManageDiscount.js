import './managediscount.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import servicesForManageDiscount from '../../../Services/servicesForManageDiscount';
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
import { Container, Row, Col } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ManageDiscount = () => {
    const [idUpdate, setIdUpdate] = useState(1);
    const [discountListData, setDiscountListData] = useState([]);
    const [discountDetailsData, setDiscountDetailsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(false);
    // title update
    // const [upBookTitle, setUpBookTitle] = useState("");
    // check lỗi insert
    const [dataInsert, setDataInsert] = useState({
        book_id: "",
        discount_start_date: "",
        discount_end_date: "",
        discount_price: "",
    });
    // const [dataUpdate, setDataUpdate] = useState({
    //     category_update: "",
    //     author_update: "",
    //     publisher_update: "",
    //     book_title_update: "",
    //     book_summary_update: "",
    //     quantity_update: "",
    //     book_price_update: "",
    //     upload_update: "",
    // });
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };

    const showModal = () => {
        setOpen(true);
    };

    const showModalUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCancelUpdate = () => {
        setOpenUpdate(false);
    };

    const handleModalUpdate = (id) => {
        setIdUpdate(id);
        setOpenUpdate(true);
    }

    useEffect(() => {
        const fetchProductList = async () => {
            const discountList = await servicesForManageDiscount.getDiscountAdmin();
            setDiscountListData(discountList);
        };
      fetchProductList();
    }, []);

    // useEffect(() => {
    //     const fetchProductDetails = async () => {
    //         const bookdetails = await servicesForManageBook.getDetails(idUpdate);
    //         setBookDetailsData(bookdetails);
    //         setDataUpdate({
    //             category_update: bookdetails[0].category_name,
    //             author_update: bookdetails[0].author_name,
    //             publisher_update: bookdetails[0].publisher_name,
    //             book_title_update: bookdetails[0].book_title,
    //             book_summary_update: bookdetails[0].book_summary,
    //             quantity_update: bookdetails[0].quantity,
    //             book_price_update: bookdetails[0].book_price,
    //             upload_update: bookdetails[0].book_cover_photo,
    //         })
    //     };
    //     fetchProductDetails();
    // }, [idUpdate]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Book Id',
            dataIndex: 'book_id',
        },
        {
            title: 'Discount start_date',
            dataIndex: 'discount_start_date',
        },
        {
            title: 'Discount end_date',
            dataIndex: 'discount_end_date',
        },
        {
            title: 'Discount price',
            dataIndex: 'discount_price',
        },
        {
            title: 'Update',
            dataIndex: 'update',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        },
    ];

    const data = [];
    if(discountListData.length > 0) {
        discountListData.map((discount) => {
            var dataItem = {
                key: discount.id,
                id: discount.id,
                book_id: discount.book_id,
                discount_start_date: discount.discount_start_date,
                discount_end_date: discount.discount_end_date,
                discount_price: discount.discount_price,
                update: 
                    <Button type="text" onClick={() => handleModalUpdate(discount.id)} icon={<SettingOutlined />} >
                    </Button>,
                delete: 
                    <Button type="text" icon={<CloseOutlined />}>
                    </Button>,
            }
            data.push(dataItem);
        }); 
    }
        
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const InsertDiscount = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageDiscount.insertDiscount({
                    // category_id: dataInsert.category,
                    // author_id: dataInsert.author,
                    // publisher_id: dataInsert.publisher,
                    // book_title: dataInsert.book_title,
                    // book_summary: dataInsert.book_summary,
                    // quantity: dataInsert.quantity,
                    // book_price: dataInsert.book_price,
                    // book_cover_photo: null,
                });
                if(c.status_code !== 422) {
                    alert('success');
                } else {
                    alert('failed');
                }        
            } catch (error) {
                console.log(error);
            }
        }
        InsertDiscount();
    }

    function handleSubmitUpdate(e) {
        e.preventDefault();
        const UpdateDiscount = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageDiscount.updateDiscount({
                    // category_id: dataUpdate.category_update,
                    // author_id: dataUpdate.author_update,
                    // publisher_id: dataUpdate.publisher_update,
                    // book_title: dataUpdate.book_title_update,
                    // book_summary: dataUpdate.book_summary_update,
                    // quantity: dataUpdate.quantity_update,
                    // book_price: dataUpdate.book_price_update,
                    // book_cover_photo: null,
                },idUpdate);
                if(c.status_code !== 422) {
                    alert('success');
                } else {
                    alert('failed');
                }        
            } catch (error) {
                console.log(error);
            }
        }
        UpdateDiscount();
    }

    // function handle(e) {
    //     let newData ={...dataInsert}
    //     newData[e.target.id] = e.target.value;
    //     setDataInsert(newData);
    // }

    // function handleUpdate(e) {
    //     let newData ={...dataUpdate}
    //     newData[e.target.id] = e.target.value;
    //     setDataUpdate(newData);
    // }

    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Discount</h2>
            </Col>
            <Col xs lg={2}>
                <Button color="secondary" onClick={showModal}>Create new Discount</Button>
                <Modal
                    title="Create New Discount"
                    open={open}               
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form
                        labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 14,
                          }}
                          layout="horizontal"
                          onValuesChange={onFormLayoutChange}
                          disabled={componentDisabled}
                    >
                        <Form.Item label="Book_id">
                            <Input id="book_id" onChange={(e) => handle(e)} value={dataInsert.book_id} />
                        </Form.Item>
                        <Form.Item label="Discount start_date">
                            <DatePicker id="discount_start_date" onChange={(e) => handle(e)} value={dataInsert.discount_end_date} />
                        </Form.Item>
                        <Form.Item label="Discount end_date">
                            <DatePicker id="discount_end_date" onChange={(e) => handle(e)} value={dataInsert.discount_end_date} />
                        </Form.Item>
                        <Form.Item label="Book_price">
                            <Input id="book_price" onChange={(e) => handle(e)} value={dataInsert.book_price} />
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </Form>
                </Modal>
            </Col>
        </Row>
        
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageDiscount;