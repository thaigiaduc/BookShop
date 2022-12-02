import './manageauthor.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import servicesForManageAuthor from '../../../Services/servicesForManageAuthor';
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
const ManageAuthor = () => {
    const [idUpdate, setIdUpdate] = useState(1);
    const [authorListData, setAuthorListData] = useState([]);
    const [authorDetailsData, setauthorDetailsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [dataInsert, setDataInsert] = useState({
        author_name: "",
        author_bio: "",
    });
    const [dataUpdate, setDataUpdate] = useState({
        author_name_update: "",
        author_bio_update: "",
    });
    //////////////////////////////////////////////////////////////////////////////
    const [checkAuthorNameIS, setCheckAuthorNameIS] = useState(false);
    const [messageAuthorNameIS, setMessageAuthorNameIS] = useState("");
    const [checkAuthorBioIS, setCheckAuthorBioIS] = useState(false);
    const [messageAuthorBioIS, setMessageAuthorBioIS] = useState("");
    //////////////////////////////////////////////////////////////////////////////
    const [checkAuthorNameUpIS, setCheckAuthorNameUpIS] = useState(false);
    const [messageAuthorNameUpIS, setMessageAuthorNameUpIS] = useState("");
    const [checkAuthorBioUpIS, setCheckAuthorBioUpIS] = useState(false);
    const [messageAuthorBioUpIS, setMessageAuthorBioUpIS] = useState("");
    //////////////////////////////////////////////////////////////////////////////
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
        const fetchAuthorList = async () => {
            const authorList = await servicesForManageAuthor.getAuthorAdmin();
            setAuthorListData(authorList);      
        };
      fetchAuthorList();
    }, []);

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            const authordetails = await servicesForManageAuthor.getDetails(idUpdate);
            setauthorDetailsData(authordetails);
            setDataUpdate({
                author_name_update: authordetails[0].author_name,
                author_bio_update: authordetails[0].author_bio,
            })
        };
        fetchAuthorDetails();
    }, [idUpdate]);

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
            title: 'Author Name',
            dataIndex: 'author_name',
        },
        {
            title: 'Author Bio',
            dataIndex: 'author_bio',
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
    authorListData.map((author) => {
        var dataItem = {
            key: author.id,
            id: author.id,
            author_name: author.author_name,
            author_bio: author.author_bio,
            update: 
                <Button type="text" onClick={() => handleModalUpdate(author.id)} icon={<SettingOutlined />} >
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
        const InsertAuthor = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageAuthor.insertAuthor({
                    author_name: dataInsert.author_name,
                    author_bio: dataInsert.author_bio,
                });
                if(c.status_code !== 422) {
                    alert('success');
                    window.location.reload();
                } else {
                    if(typeof c.data.author_name !== "undefined") {
                        setCheckAuthorNameIS(true);
                        setMessageAuthorNameIS(c.data.author_name[0]);        
                    } else {
                        setCheckAuthorNameIS(false);
                        setMessageAuthorNameIS("");     
                    }

                    if(typeof c.data.author_bio !== "undefined") {
                        setCheckAuthorBioIS(true);
                        setMessageAuthorBioIS(c.data.author_bio[0]);        
                    } else {
                        setCheckAuthorBioIS(false);
                        setMessageAuthorBioIS("");     
                    }
                }        
            } catch (error) {
                console.log(error);
            }
        }
        InsertAuthor();
    }

    function handleSubmitUpdate(e) {
        e.preventDefault();
        const UpdateAuthor = async () => {
            try {
                // truyền object sang productAPI và nhận về response
                const c = await servicesForManageAuthor.updateAuthor({
                    author_name: dataUpdate.author_name_update,
                    author_bio: dataUpdate.author_bio_update,
                },idUpdate);
                if(c.status_code !== 422) {
                    alert('success');
                } else {
                    if(typeof c.data.author_name !== "undefined") {
                        setCheckAuthorNameUpIS(true);
                        setMessageAuthorNameUpIS(c.data.author_name[0]);        
                    } else {
                        setCheckAuthorNameUpIS(false);
                        setMessageAuthorNameUpIS("");     
                    }

                    if(typeof c.data.author_bio !== "undefined") {
                        setCheckAuthorBioUpIS(true);
                        setMessageAuthorBioUpIS(c.data.author_bio[0]);        
                    } else {
                        setCheckAuthorBioUpIS(false);
                        setMessageAuthorBioUpIS("");     
                    }
                }        
            } catch (error) {
                console.log(error);
            }
        }
        UpdateAuthor();
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
                <h2>Manage Author</h2>
            </Col>
            <Col xs lg={2}>
                <Button color="secondary" onClick={showModal}>Create new Author</Button>
                <Modal
                    title="Create New Author"
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
                        <Form.Item label="Author_name">
                            <Input id="author_name" onChange={(e) => handle(e)} value={dataInsert.author_name} />
                            {
                                checkAuthorNameIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageAuthorNameIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Author_bio">
                            <TextArea rows={3} id="author_bio" onChange={(e) => handle(e)} value={dataInsert.author_bio} />
                            {
                                checkAuthorBioIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageAuthorBioIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>
                        <Button type="primary" onClick={handleCancel}>Cancle</Button>
                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
                    </Form>
                </Modal>

                <Modal
                    title="Update Information Author"
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
                        <Form.Item label="Author Name">
                            <Input id="author_name_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.author_name_update} />
                            {
                                checkAuthorNameUpIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageAuthorNameUpIS}
                                    </Alert> 
                                </small> : ""
                            }
                        </Form.Item>

                        <Form.Item label="Author Bio">
                            <TextArea rows={3} id="author_bio_update" onChange={(e) => handleUpdate(e)} value={dataUpdate.author_bio_update} />
                            {
                                checkAuthorBioUpIS != false ? 
                                <small>
                                    <Alert variant="danger">
                                        {messageAuthorBioUpIS}
                                    </Alert> 
                                </small> : ""
                            }
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

export default ManageAuthor;