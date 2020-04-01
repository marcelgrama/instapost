import PropTypes from 'prop-types';

const Logo = ({ size = 100 }) => (
  <img alt="Roskins Logo" width={`${size}px`} src="/static/imgs/logo.png" />
);

Logo.propTypes = {
  size: PropTypes.number,
};

Logo.defaultProps = {
  size: 100,
};

export default Logo;
