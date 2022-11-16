import './managebook.css';
import Images from "../../../../assets";
import defaultBookCover from '../../../../assets/bookcover/defaultbook.png';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import servicesForManageBook from '../../../Services/servicesForManageBook';
import { Table, Image, Modal } from 'antd';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
    SettingOutlined,
    CloseOutlined,
  } from '@ant-design/icons';

const ManageBook = () => {
    const [bookListData, setBookListData] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    useEffect(() => {
        const fetchProductList = async () => {
            const bookList = await servicesForManageBook.getBookAdmin();
            setBookListData(bookList);
        };
      fetchProductList();
    }, []);
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
        //   filters: [
        //     {
        //       text: 'Joe',
        //       value: 'Joe',
        //     },
        //     {
        //       text: 'Jim',
        //       value: 'Jim',
        //     },
        //     {
        //       text: 'Submenu',
        //       value: 'Submenu',
        //       children: [
        //         {
        //           text: 'Green',
        //           value: 'Green',
        //         },
        //         {
        //           text: 'Black',
        //           value: 'Black',
        //         },
        //       ],
        //     },
        //   ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
        //   onFilter: (value, record) => record.name.indexOf(value) === 0,
        //   sorter: (a, b) => a.name.length - b.name.length,
        //   sortDirections: ['descend'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
        //   defaultSortOrder: 'descend',
        //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Author',
            dataIndex: 'author',
          //   defaultSortOrder: 'descend',
          //   sorter: (a, b) => a.age - b.age,
          },
        {
            title: 'Book_title',
            dataIndex: 'book_title',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Book_summary',
            dataIndex: 'book_summary',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Book_price',
            dataIndex: 'book_price',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Book_cover_photo',
            dataIndex: 'book_cover_photo',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Update',
            dataIndex: 'update',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
        //   filters: [
        //     {
        //       text: 'London',
        //       value: 'London',
        //     },
        //     {
        //       text: 'New York',
        //       value: 'New York',
        //     },
        //   ],
        //  onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];
    const data = [];
    bookListData.map((book) => {
        var dataItem = {
            key: book.id,
            id: book.id,
            category: book.category_name,
            author: book.author_name,
            book_title: book.book_title,
            book_summary: book.book_summary,
            book_price: book.book_price,
            book_cover_photo: 
            <Image
                width={200}
                src={book.book_cover_photo ? Images[book.book_cover_photo]:Images['defaultBook']}
            />,   
            update: <SettingOutlined />,
            delete: <CloseOutlined />,
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
            <Col xs lg={2}>
                <Button variant="secondary" onClick={showModal}>Create new Book</Button>
                <Modal
                    title="Title"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </Col>
        </Row>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Container>
    );
}

export default ManageBook;