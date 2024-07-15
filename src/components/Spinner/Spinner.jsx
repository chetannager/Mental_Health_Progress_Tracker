import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const Spinner = (props) => {
  const {
    color,
    show = true,
    variant = "indeterminate",
    size = 40,
    thickness,
    disableShrink,
  } = props;
  if (!show) {
    return null;
  }

  return (
    <CircularProgress
      color={color}
      variant={variant}
      size={size}
      thickness={thickness}
      disableShrink={disableShrink}
    />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  show: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.number,
  thickness: PropTypes.number,
  disableShrink: PropTypes.bool,
};

Spinner.defaultProps = {
  color: "primary",
  show: true,
  variant: "indeterminate",
  size: 40,
  value: 0,
  thickness: 3.6,
  disableShrink: false,
};

export default Spinner;
