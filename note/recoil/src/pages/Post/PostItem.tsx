import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Typography, Tag } from 'antd';

// const { Title, Paragraph } = Typography;

// 列表中的单个文章
function PostItem(props: any) {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <PageHeader
      title={ <span onClick={ () => navigate(`/post/${post.id}`) }>{post.title}</span> }
      className='post-item'
      subTitle='whoicliu'
      tags={<Tag color='blue'>mockData</Tag>}
    >
      { post.body }
    </PageHeader>
  );
}

export default PostItem;