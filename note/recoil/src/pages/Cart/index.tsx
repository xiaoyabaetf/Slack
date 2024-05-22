import React, { useEffect, memo } from 'react';
import { Image, Table, Checkbox, Typography, Row, Col, Button } from 'antd';
import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import { produce } from 'immer';
import { cartState, settingState } from '../../store';
import { cartAPI } from '../../apis';
import './index.less';

const { Title, Paragraph, Text, Link } = Typography;

// const cartList = [
//   {
//     id: Math.random(),
//     key: Math.random(),
//     title: '小米手机',
//     num: 1,
//     price: 1999
//   },
//   {
//     id: Math.random(),
//     key: Math.random(),
//     title: '小米手表',
//     num: 2,
//     price: 100
//   }
// ];

/**
 * 购物车
 */
function Cart() {
  const [isAllCheched, setIsAllChecked] = useRecoilState(cartState.isAllCheckedAtom);

  const [cartList, setCartList] = useRecoilState(cartState.cartListAtom);
  const cartAmount = useRecoilValue(cartState.cartAmountAtom);
  const cartSelectedCount = useRecoilValue(cartState.cartCountAtom);

  const logCartItems = useRecoilCallback(({snapshot}) => async () => {
    const release = snapshot.retain();
    console.log('snapshot:', snapshot.isRetained(), snapshot.getID(), snapshot.getLoadable(settingState.langAtom).contents);
    const numItemsInCart = await snapshot.getPromise(cartState.cartCountAtom);
    console.log('购物车中内容：', numItemsInCart);

    setTimeout(() => {
      release();
      console.log('snapshot:', snapshot.isRetained(), snapshot.getID());
    }, 3000);
  });

  useEffect(() => {
    console.table(cartList);
  }, [cartList]);

  // 全选
  const checkAll = () => {
    const checked = !isAllCheched;
    const newCartList = cartList.map((item: any) => ({...item, isChecked: checked }));
  
    setCartList(newCartList);
    setIsAllChecked(checked);
  };

  /**
   * 选中一个商品
   */
  const checkProduct = (product: any) => {
    const checked = !product.isChecked;
    let allChecked = true;

    const newCartList = produce(cartList, (draft: any) => {
      draft.map((item: any) => {
        if (item.id === product.id) {
          // return {...item, isChecked: checked };
          item.isChecked = checked;
        }

        // 必须放在更新 isChecked 之后
        if (!item.isChecked) {
          allChecked = false;
        }

        return item;
      });
    });

    // console.log('选中了：', newCartList, product, checked, allChecked);

    setCartList(newCartList);
    setIsAllChecked(allChecked);
  };

  // 获取购物车列表
  const getCartList = async () => {
    // debugger;
    const target: any = [];
    const res: any = await cartAPI.getCartList();
    // console.log('1111111', res);
    if (res.code === 200) {
      for (const item of res.data.list) {
        target.push({...item, key: item.id, isChecked: true});
      }
    }

    setCartList(target);
  };

  useEffect(() => {
    // debugger;
    getCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAllHeader = (
    <Checkbox
      // style={{ lineHeight: '60px' }}
      checked={ isAllCheched }
      onClick={ checkAll }
    />
  );
  
  /**
   * 数据表需要显示的字段
   */
  const columns = [
    {
      title: checkAllHeader,
      dataIndex: 'id',
      key: 'id',
      width: '3%', 
      contentAlign: 'center',
      // fixed: 'left',
      render(_: any, record: any) {
        // return index + 1
        return (
          <div >
            <Checkbox
              checked={ record.isChecked }
              onClick={ () => checkProduct(record) }
            />
          </div>
        );
      }
    },
    {
      title: '商品',
      dataIndex: 'title',
      key: 'title',
      titleAlign: 'center',
      width: '47%', 
      render(_: any, record: any) {
        // console.log('2222', record);
        return (
          <div style={{ display: 'flex'}}>
            <Image
              width={ 60 }
              src={ record.img }
            />
            <span style={{ marginLeft: '20px' }}>{ record.title }</span>
          </div>
        );
      }
    },
    {
      title: '单价(元)',
      dataIndex: 'price',
      key: 'price',
      titleAlign: 'center',
      contentAlign: 'right',
      width: '15%',
      render(_: any, record: any) {
        return <span className='price'>￥{ record.price }</span>;
      }
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      width: '15%',
      render(_: any, record: any) {
        return <span>{record.num}</span>;
      }
    },
    {
      title: '金额',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      render(_: any, record: any) {
        return <span className='price'>￥{ (record.num * record.price).toFixed(2) }</span>;
      }
    },
  ];

  return (
    <div >
      <Row>
        <Col span={ 12 }>
          <Title level={2}>购物车(选中：{ cartSelectedCount })</Title> 
        </Col>
        <Col span={ 12 } style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Title level={2}>总金额：<span style={{ color: 'red' }}>￥{ cartAmount }</span></Title>
        </Col>
      </Row>
      <Button type='primary' onClick={ logCartItems }>useRecoilCallback</Button>
      <Table 
        columns={ columns } 
        dataSource={ cartList } 
        size='middle'
        pagination={false}
      />
    </div>
  );
}

export default memo(Cart);
