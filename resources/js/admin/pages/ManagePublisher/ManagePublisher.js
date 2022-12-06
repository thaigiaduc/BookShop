import './managepublisher.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import servicesForManagePublisher from '../../../Services/servicesForManagePublisher';
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
const ManagePublisher = () => {
    const [idUpdate, setIdUpdate] = useState(1);
    const [publisherListData, setPublisherListData] = useState([]);
    const [publisherDetailsData, setpublisherDetailsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [dataInsert, setDataInsert] = useState({
        publisher_name: "",
        publisher_desc: "",
    });
    const [dataUpdate, setDataUpdate] = useState({
        publisher_name_update: "",
        publisher_desc_update: "",
    });
    const [checkPublisherNameIS, setCheckPublisherNameIS] = useState(false);
    const [messagePublisherNameIS, setMessagePublisherNameIS] = useState("");
    const [checkPublisherDescIS, setCheckPublisherDescIS] = useState(false);
    const [messagePublisherDescIS, setMessagePublisherDescIS] = useState("");
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
            const publisherList = await servicesForManagePublisher.getPublisherAdmin();
            setPublisherListData(publisherList);      
        };
      fetchProductList();
    }, []);

    useEffect(() => {
        const fetchPublisherDetails = async () => {
            const publisherdetails = await servicesForManagePublisher.getDetails(idUpdate);
            setpublisherDetailsData(publisherdetails);
            setDataUpdate({
                publisher_name_update: publisherdetails[0].publisher_name,
                publisher_desc_update: publisherdetails[0].publisher_desc,
            })
        };
        fetchPublisherDetails();
    }, [idUpdate]);

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
            title: 'Publisher Name',
            dataIndex: 'publisher_name',
        },
        {
            title: 'Publisher desc',
            dataIndex: 'publisher_desc',
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
    publisherListData.map((pb) => {
        var dataItem = {
            key: pb.id,
            id: pb.id,
            publisher_name: pb.publisher_name,
            publisher_desc: pb.publisher_desc,
            update: 
                <Button type="text" onClick={() => handleModalUpdate(pb.id)} icon={<SettingOutlined />} >
                </Button>,
            delete: 
                <Button type="text" icon={<CloseOutlined />}>
                </Button>,
        }
        data.push(dataItem);
    }); 

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const InsertPublisher = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManagePublisher.insertPublisher({
                    publisher_name: dataInsert.publisher_name,
                    publisher_desc: dataInsert.publisher_desc,
                });
                if(c.status_code !== 422) {
                    alert('success');
                    window.location.reload();
                } else {
                    if(typeof c.data.publisher_name !== "undefined") {
                        setCheckPublisherNameIS(true);
                        setMessagePublisherNameIS(c.data.publisher_name[0]);        
                    } else {
                        setCheckPublisherNameIS(false);
                        setMessagePublisherNameIS("");     
                    }

                    if(typeof c.data.publisher_desc !== "undefined") {
                        setCheckPublisherDescIS(true);
                        setMessagePublisherDescIS(c.data.publisher_desc[0]);        
                    } else {
                        setCheckPublisherDescIS(false);
                        setMessagePublisherDescIS("");     
                    }
                    
                }        
            } catch (error) {
                console.log(error);
            }
        }
        InsertPublisher();
    }

    function handleSubmitUpdate(e) {
        e.preventDefault();
        const UpdatePublisher = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManagePublisher.updatePublisher({
                    publisher_name: dataUpdate.publisher_name_update,
                    publisher_desc: dataUpdate.publisher_desc_update,
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
        UpdatePublisher();
    }

    function handle(e) {
        let newData ={...dataInsert}
        newData[e.target.id] = e.target.value;
        setDataInsert(newData);
    }

    function handleUpdate(e) {
        let newData ={...dataUpdate}
        newData[e.target.id] = e.target.value;
        setDataUpdate(newData);
    }

    return (
      <Container fluid>
        <Row>
            <Col xs lg={10}>
                <h2>Manage Publisher</h2>
            </Col>
            <Col xs lg={2}>
                <Button color="secondary" onClick={showModal}>Create new Publisher</Button>
                <Modal
                    title="Create New Publisher"
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
                        <Form.Item label="Publisher_name">
                            <Input id="publisher_name" onChange={(e) => handle(e)} value={dataInsert.publisher_name} />
                            {
                                checkPublisherNameIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messagePublisherNameIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Publisher_desc">
                            <TextArea rows={3} id="publisher_desc" onChange={(e) => handle(e)} value={dataInsert.publisher_desc} />
                            {
                                checkPublisherDescIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messagePublisherDescIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancle</Button>
                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </Form>
                </Modal>

                <Modal
                    title="Update Information Publisher"
                    open={openUpdate}               
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancelUpdate}
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
                        <h5>ID: {idUpdate}</h5>
                        <Form.Item label="Publisher Name">
                            <Input id="publisher_name_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.publisher_name_update} />
                        </Form.Item>

                        <Form.Item label="Publisher Desc">
                            <TextArea rows={3} id="publisher_desc_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.publisher_desc_update} />
                        </Form.Item>
                        <Button type="primary" onClick={handleCancelUpdate}>Cancel</Button>
                        <Button type="submit" onClick={(e) => handleSubmitUpdate(e)}>Update</Button>
                    </Form>
                </Modal>
            </Col>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManagePublisher;