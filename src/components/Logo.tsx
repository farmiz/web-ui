import React from "react";
import farmizLogo from "/farmiz.svg";

interface LogoSize {
    size: "sm" | "md" | "lg"
}
const Logo: React.FC<LogoSize> = ({size}) => {
    const sizes: {[key in LogoSize["size"]]: string} = {
        lg: "200px",
        md: "150px",
        sm: "100px"
    }
  return (
    <div>
      <img src={farmizLogo} alt="FARMIZ" width={sizes[size]} />
    </div>
  );
};

export default Logo;
