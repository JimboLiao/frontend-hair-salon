import { styled } from "styled-components";
import { StyledContainer, StyledLink } from "../../components/common";
import { Box, Button, Stack, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { loginApi } from "../../api";

const StyledLoginBlock = styled.div`
  margin: 64px auto;
  max-width: 640px;
  border: solid 2px #3072ff;
  border-radius: 20px;

  h2 {
    padding: 32px 0px;
    font-size: 54px;
    text-align: center;
    color: #3072ff;
  }
`;
const StyledFormContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const LoginPage = () => {
  const formBoxStyle = { display: "flex", flexDirection: "column" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    loginApi(email, password);
  };
  //@todo onClicks
  const handleForgot = (event) => {
    console.log(event.target);
  };
  const handleGoogleLogin = (event) => {
    console.log(event.target);
  };
  const handleSignUp = (event) => {
    console.log(event.target);
  };
  const handleLoginText = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordText = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main>
      <StyledContainer>
        <StyledLoginBlock>
          <h2>Login</h2>
          <StyledFormContainer>
            <Box component="form" sx={formBoxStyle}>
              <TextField
                required
                id="email"
                label="E-mail"
                type="email"
                sx={{ paddingBottom: 2 }}
                value={email}
                onChange={handleLoginText}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                sx={{ paddingBottom: 2 }}
                value={password}
                onChange={handlePasswordText}
              />
            </Box>
            <Box sx={{ paddingBottom: 8 }}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Button variant="outlined" onClick={handleForgot}>
                    Forgot
                  </Button>
                  <Button variant="contained" onClick={handleLogin}>
                    Login
                  </Button>
                </Stack>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleSignUp}
                    component={StyledLink}
                    to="/signup"
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </StyledFormContainer>
        </StyledLoginBlock>
      </StyledContainer>
    </main>
  );
};

export default LoginPage;
