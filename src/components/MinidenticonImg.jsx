import React, { useMemo } from "react";
import { minidenticon } from "minidenticons";

const MinidenticonImg = ({
  username,
  saturation = "90",
  lightness = "50",
  ...props
}) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );

  return <img src={svgURI} alt={username} {...props} />;
};

export default MinidenticonImg;
