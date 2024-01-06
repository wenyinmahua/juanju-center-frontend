import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '卷聚小分队出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '太原理工大学',
          title: '太原理工大学',
          href: 'https://www.tyut.edu.cn/',
          blankTarget: true,
        },

        {
          key: 'github',
          // TS语言把两对象封装在一起
          title: <><GithubOutlined /> 麻花 GitHub </>,
          href: 'https://github.com/wenyinmahua',
          blankTarget: true,
        },
        {
          key: '太原理工大学软件学院',
          title: '太原理工大学软件学院',
          href: 'https://rjxy.tyut.edu.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
