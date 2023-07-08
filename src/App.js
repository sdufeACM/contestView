import { Table,Typography } from 'antd';
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import {FieldTimeOutlined } from '@ant-design/icons';
const { Text } = Typography;

const { Column } = Table;
function App() {
    const [loading, setLoading] = useState(true); // 加载状态
    const [data, setData] = useState([]);
    useEffect(() => {
        const now = new Date().getTime();
        axios.get('https://contest.sdufeacm.club/data',{
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
                'referer': 'https://contest.sdufeacm.club/'
            }
        })
            .then(res => {
                setLoading(false);
                setData(res.data
                    .filter(item => new Date(item.start_time).getTime() > now) // 筛选未开始的比赛
                    .map(item => {
                        // 将 UTC+0 时间转换为北京时间
                        const startTime = new Date(item.start_time).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                        const endTime = new Date(item.end_time).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
                        item.start_time = startTime.replace(/\//g, '-').replace(/\b\d\b/g, '0$&'); // 转换格式
                        item.end_time = endTime.replace(/\//g, '-').replace(/\b\d\b/g, '0$&');
                        return item;
                    }));
            })
            .catch(err => console.log(err));
    }, []);
    const getTime = (record) => {
        //获取倒计时 如果是大于1天的话，就显示天数，否则显示小时，如果不到1小时，就显示分钟
        const now = new Date().getTime();
        const startTime = new Date(record.start_time).getTime();
        if (startTime > now) {
            const time = (startTime - now) / 1000;
            if (time > 86400) {
                return Math.floor(time / 86400) + "天";
            } else if (time > 3600) {
                return Math.floor(time / 3600) + "小时";
            } else {
                return Math.floor(time / 60) + "分钟";
            }

        }
    }
    const renderInfo = (text, record) => {
        return (
            <a href={record.link} target="_blank" rel="noreferrer">
                {text}   <Text keyboard><FieldTimeOutlined />{getTime(record)}</Text>
            </a>
        )
    }

    return (
        <div>
            <div id="div1">
                <fieldset>
                    <h2>最近的比赛</h2>
                    <Table dataSource={data} pagination={false} rowKey="id" loading={loading}>
                        <Column title="来源" dataIndex="source" key="source" />
                        <Column title="比赛名称" dataIndex="name" key="name" render={renderInfo} />
                        <Column title="开始时间" dataIndex="start_time" key="start_time" />
                        <Column title="结束时间" dataIndex="end_time" key="end_time" />
                    </Table>
                </fieldset>
            </div>
            <div id="footer">
                <p>Shandong University of Finance and Economics ACM Society</p>
                <p>Copyright © 2023-2023 <a href="https://github.com/sdufeACM"> SDUFEACM开发组</a>. All Rights Reserved</p>
            </div>
        </div>
    );
}

export default App;
