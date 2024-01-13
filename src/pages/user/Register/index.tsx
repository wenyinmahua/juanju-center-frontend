import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history, Link} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constants";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  //表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const{ userPassword, checkPassword } = values;
    //校验
    if(userPassword!== checkPassword){
      message.error('两次密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:'/user/login',
          query,
        });
        return;
      }else{
        // throw new Error();
      }
    } catch (error: any ) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      // @ts-ignore
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="Juan Ju 卷聚用户中心"
          subTitle={'卷王聚集地用户信息管理中心'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}

                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                  {
                    min: 4,
                    message: '用户名最小长度是4！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type : "string",
                    message: '密码的最小长度是8！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入再次密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type : "string",
                    message: '密码的最小长度是8！',
                  },
                ]}
              />
              <ProFormText
                name="stuId"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入学号'}

                rules={[
                  {
                    required: true,
                    message: '学号是必填项！',
                  },
                  {
                    min: 10,
                    message: '学号的长度只能是10！',
                  },
                  {
                    max: 10,
                    message: '学号的长度只能是10！',
                  }
                ]}
              />
            </>
          )}
          <Link to={"/user/login"}>返回登录</Link>
          <p></p>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
