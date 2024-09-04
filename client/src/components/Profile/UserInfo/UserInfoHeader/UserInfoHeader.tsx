import React from 'react'
import "./UserInfoHeader.css"
import { LeftSquareOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import { useAppDispatch } from '../../../../store/store';
import { logout } from '../../../../store/reducers/UserReducers/ActionCreators';
import { useNavigate } from 'react-router-dom';
import { PagePath } from '../../../../shared/models/PagePath';


const UserInfoHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    await dispatch(logout())
    navigate(PagePath.login)
  }

  return (
    <div className='UserInfoHeader'>
      <span>Информация о пользователе</span>
      <Button danger type="text" onClick={(e) => handleLogout(e)}><LeftSquareOutlined /> Выйти</Button>
    </div>
  )
}

export {UserInfoHeader} 