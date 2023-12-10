import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
`;

const MenuDrawer = ({ pages, token }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages?.map((page, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton>
                  <StyledLink to={`/${page}`}>
                    <ListItemText sx={{ color: "black" }}>
                      {page.toUpperCase()}
                    </ListItemText>
                  </StyledLink>
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem>
            <ListItemButton>
              {token ? (
                <StyledLink to="/member">
                  <ListItemText sx={{ color: "black" }}>MEMBER</ListItemText>
                </StyledLink>
              ) : (
                <StyledLink to="/login">
                  <ListItemText sx={{ color: "black" }}>LOGIN</ListItemText>
                </StyledLink>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuRoundedIcon sx={{ color: "whitesmoke" }}></MenuRoundedIcon>
      </IconButton>
    </>
  );
};

export default MenuDrawer;
