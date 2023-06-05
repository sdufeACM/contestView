import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FloatButton, notification} from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
      <>
          <FloatButton
              icon={<QuestionCircleOutlined />}
              type="default"
              style={{
                  right: 94,
              }}
              tooltip={<div>关于</div>}
              onClick={()=>{
                  notification.open({
                      message: '关于',
                      description:
                          <>
                              sdufeACM比赛日历<br />
                              react随便糊的，接口用的sdut的接口<br />
                              <a href="https://github.com/xia0ne">YuRuiH</a>

                          </>
              })}}
          />
      </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
