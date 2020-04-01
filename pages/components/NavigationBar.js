import Page from '../../components/Page/';
import connectPage from '../../store/connectPage';

const NavBarLayout = () => <Page />;

export default connectPage()(NavBarLayout);
