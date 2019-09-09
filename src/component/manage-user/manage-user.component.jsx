import React, { useEffect, useState } from 'react';
import { db } from '../data/firebase';
import UserItem from '../user-item/user-item.component';
import { StyledUserList } from './manage-user.style';
import HeaderTitle from '../_dumb/header-title/header-title.component';

const ManageUser = () => {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    (async () => {
      const userSnap = await db.collection('user').get()
      const userList = userSnap.docs.map(user => ({ id: user.id, ...user.data() }))
      setUserList(userList)
    })()
  }, [])
  return (
    <div>
      <HeaderTitle {...{
        text: 'Manage user panel',
        tag: 'h1',
        fontSize: '22px',
      }} />
      <StyledUserList>
        {userList.map(user => <UserItem key={user.id} user={user} />)}
      </StyledUserList>
    </div>
  );
};

export default ManageUser;
