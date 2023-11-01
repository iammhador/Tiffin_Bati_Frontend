import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Breadcrumb } from 'antd';

const breadcrumb = () => {
    return (
        <Breadcrumb
        items={[
          {
            href: '',
            title: <HomeOutlined />,
          },
          {
            href: '',
            title: (
              <>
                <UserOutlined />
                <span>Application List</span>
              </>
            ),
          },
          {
            title: 'Application',
          },
        ]}
      />
    );
};

export default breadcrumb;