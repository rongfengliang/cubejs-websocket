import React from 'react';
import { Table } from 'antd';
import { useCubeQuery } from '@cubejs-client/react';
import cubejs from '@cubejs-client/core';
import WebSocketTransport from '@cubejs-client/ws-transport';
import 'antd/dist/antd.css';

const cubejsApi = cubejs({
  transport: new WebSocketTransport({
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI2Njc5NzcsImV4cCI6MTYzMjc1NDM3N30.ki5AokHM6cgRAK7XUaZbOk27PDzu0vPRImzM442eoM0",
    apiUrl: 'ws://localhost:4000/cubejs-api/v1',
  }),
});

function Demo() {
  const { resultSet, isLoading, error, progress } = useCubeQuery(
    {"dimensions":["testapi.a","testapi.b"]},{
    cubejsApi,
    subscribe: true,
    });

  if (isLoading) {
    return <div>{progress && progress.stage && progress.stage.stage || 'Loading...'}</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }

  function demoapp(item){
    return item["shortTitle"]
  }

  const dataSource = resultSet.tablePivot();
  const columns = resultSet.tableColumns().map((item)=>{

    let info = {
      ...item,
      // fixed:item.shortTitle=="count",
      title:`${item.shortTitle}||测试`,
      shortTitle:`${item.title}`
    }
    return info
  })
  console.log(columns)
return <div >
    <Table columns={columns} dataSource={dataSource} scroll={{ x: 1000, y: 300 }} />;
    </div>
}

// Create Document Component


export default Demo;