import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout, PageHeader, Typography, Tag, List } from 'antd';
import { useRecoilValue, waitForAll, waitForAny, waitForNone } from 'recoil';
import { postState } from '../../store';

const { Title, Paragraph } = Typography;
const { Header, Footer, Sider, Content } = Layout;

// 文章详情
function PostDetail() {
  const { postId } = useParams();
  console.log('postId', postId);
  // const postDetailState = useRecoilValue(postState.postDetailState(postId));
  // console.log('postDetailState', postDetailState);

  const [detail, comment] = useRecoilValue(
    waitForAll([postState.postDetailAtom(postId), postState.postCommentAtom(postId)])
  );

  console.log('=====', detail, comment);

  return (
    <Layout style={{ minHeight: '500px' }}>
      <Content style={{ marginBottom: '100px' }}>
        <PageHeader
          title={ detail.title }
          className='post-item'
          subTitle={ detail.author }
          tags={<Tag color='blue'>mockData</Tag>}
          ghost={ false }
        >
          {/* { detail.content } */}
          <div dangerouslySetInnerHTML={{__html:detail.content}} ></div>
        </PageHeader>

        <List
          size='large'
          header={<Title level={3}>评论列表</Title>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={comment}
          renderItem={(item: any) => <List.Item>{item.username}: {item.content}</List.Item>}
        />

      </Content>
      <Sider theme='light'>
        Sider
      </Sider>
    </Layout>
  );
}

export default PostDetail;