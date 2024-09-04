import React, { useState } from "react";
import { useAppSelector } from "../../../shared/hooks/redux";
import { Button, Card, notification } from "antd";
import userIcon from "../../../shared/icons/profile-page.svg";
import "./UserInfo.css";
import { UserInfoHeader } from "./UserInfoHeader/UserInfoHeader";
import { EditPasswordForm } from "./EditUserAttribute/EditPassword/EditPasswordForm";
import { useAppDispatch } from "../../../store/store";
import { IChangePasswordBody } from "../../../store/reducers/UserReducers/Models/ChangePasswordBody";
import { changePassword } from "../../../store/reducers/UserReducers/ActionCreators";
import { INotification, openNotificationWithIcon } from "../../../shared/utils/Notification";
import { IError } from "../../../shared/models/IError";

const UserInfo = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.userReduser);
  const { isLoading } = useAppSelector((state) => state.userReduser);
  // const { error } = useAppSelector((state) => state.userReduser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    const changePasswordBody: IChangePasswordBody = {
      email: user.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const resultAction = await dispatch(changePassword(changePasswordBody));
    if (changePassword.rejected.match(resultAction)) {
      const notificationBody: INotification = {
        api: api,
        type: "error",
        message: "Изменение пароля",
        description: (resultAction.payload as IError).message,
      };
      openNotificationWithIcon(notificationBody);
    } else {
      const notificationBody: INotification = {
        api: api,
        type: "success",
        message: "Изменение пароля",
        description: "Пароль успешно изменен!",
      };
      openNotificationWithIcon(notificationBody);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card title={<UserInfoHeader />}>
        <div className="userInfoHeader">
          <div className="userIconBlock">
            <img src={userIcon} alt="иконка пользователя" width={30} height={30} />
          </div>
          <div className="userInfoData">
            <table>
              <tbody>
                <tr>
                  <th className="userAttributeName">Имя пользователя:</th>
                  <th className="userAttribute">{user.nickname}</th>
                  <th>
                    <Button type="link">изменить</Button>
                  </th>
                </tr>
                <tr>
                  <th className="userAttributeName">Почтовый адрес:</th>
                  <th className="userAttribute">{user.email}</th>
                  <th>
                    <Button type="link">изменить</Button>
                  </th>
                </tr>
                <tr>
                  <th className="userAttributeName">Пароль:</th>
                  <th className="userAttribute">************</th>
                  <th>
                    <Button type="link" onClick={() => setIsModalOpen(true)}>
                      изменить
                    </Button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      {isModalOpen && (
        <EditPasswordForm
          handleChangePassword={handleChangePassword}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default UserInfo;
