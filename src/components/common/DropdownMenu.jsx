import React, { useState } from "react";
import { Popover, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

const StyledDropdownButton = styled.div`
  color: whitesmoke;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: black;
`;
const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <StyledDropdownButton onClick={handleDropdown}>
        MEMBER
      </StyledDropdownButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <StyledLink to="/member">Member Info</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>選項二</MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleLogout}>Logout</div>
        </MenuItem>
      </Popover>
    </div>
  );
};

export default DropdownMenu;
