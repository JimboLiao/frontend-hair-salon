import React, { useState } from "react";
import { Popover, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../api";
import { useNavigate } from "react-router-dom";

const StyledDropdownButton = styled.div`
  color: whitesmoke;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: black;
`;
const DropdownMenu = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useLogin();

  const handleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
        <MenuItem onClick={handleClose}>
          <StyledLink to="/orderhistory">My Orders</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleLogout}>Logout</div>
        </MenuItem>
      </Popover>
    </div>
  );
};

export default DropdownMenu;
