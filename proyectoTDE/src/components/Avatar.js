import React from "react";
import PropTypes from "utils/propTypes";

import classNames from "classnames";

import userImage from "assets/img/users/100_4.jpg";
import user from "assets/img/users/100_3.jpg";

const Avatar = ({
  rounded,
  circle,
  src,
  src1,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ "rounded-circle": circle, rounded }, className);
  return (
    <Tag
      src={localStorage.genero === "Femenino" ? src : src1}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,

  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object
};

Avatar.defaultProps = {
  tag: "img",
  rounded: false,
  circle: true,
  size: 40,
  src: userImage,
  src1: user,
  style: {}
};

export default Avatar;
