import './home.css';

import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
    
const Home = () => {
    return (
        <Timeline mode="alternate">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item
            dot={
                <ClockCircleOutlined
                style={{
                    fontSize: '16px',
                }}
                />
            }
            >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo.
            </Timeline.Item>
            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item
            dot={
                <ClockCircleOutlined
                style={{
                    fontSize: '16px',
                }}
                />
            }
            >
            Technical testing 2015-09-01
            </Timeline.Item>
        </Timeline>
    );
}

export default Home;