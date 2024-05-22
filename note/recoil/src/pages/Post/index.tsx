import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { postState } from '../../store';
import './index.less';

import { Loading } from '../../components';
import PostList from './PostList';

function Post() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, contents } = useRecoilValueLoadable(postState.postListAtom);

  switch (state) {
    case 'hasValue':
      console.log(contents);
      return <PostList list={contents.data.list} />;
    case 'hasError':
      return contents.msg; // error msg
    case 'loading':
      return <Loading />;
    default:
      return '--';
  }
}

export default Post;
