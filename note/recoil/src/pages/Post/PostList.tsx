import React from 'react';
import { Button } from 'antd';

import PostItem from './PostItem';

// 文章列表
function PostList(props: any) {
  const { list } = props;
  
  return (
    <div >
      <h1>文章列表</h1>
      {
        list.length > 0
          ?
          list.map((post: any) => <PostItem post={post} key={post.id} />)
          :
          <span>No Data</span>
      }
    </div>
  );
}

export default PostList;