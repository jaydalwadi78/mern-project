// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'raffle',
    path: '/dashboard/raffle',
    icon: icon('ic_raffle'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'pricelist',
    path: '/dashboard/pricelist',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'participants',
  //   path: '/dashboard/participants',
  //   icon: icon('ic_user'),
  // },
];

export default navConfig;
