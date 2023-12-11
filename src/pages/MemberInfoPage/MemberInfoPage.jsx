import styled from "styled-components";
import { StyledContainer } from "../../components/common";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getMemberApi, updateMemberApi } from "../../api";
const StyledMemberInfo = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
  .memberInfo__title {
    padding-bottom: 32px;
    font-size: 32px;
    text-align: center;
  }
`;

const StyledInfoContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;
const MemberInfoPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState("email@email.com");
  const [username, setUsername] = useState("username");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [city, setCity] = useState("city");
  const [postNumber, setPostNumber] = useState("postNumber");
  const [address, setAddress] = useState("address");

  useEffect(() => {
    const getMemberInfo = async () => {
      const data = await getMemberApi();
      setEmail(data.email);
      setUsername(data.username);
      setBirthday(data.birthday);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setCity(data.city);
      setPostNumber(data.postNumber);
      setAddress(data.address);
    };

    getMemberInfo();
  }, []);

  const handleUpdate = (event) => {
    setIsEdit(true);
  };

  const handleConfirm = (event) => {
    const updateApi = async (data) => {
      try {
        await updateMemberApi(data);
      } catch (error) {
        console.error(error);
      }
    };

    setIsEdit(false);
    const dataToUpdate = {
      email: email,
      username: username,
      birthday: birthday,
      firstName: firstName,
      lastName: lastName,
      city: city,
      postNumber: postNumber,
      address: address,
    };
    updateApi(dataToUpdate);
  };

  const handleEmailText = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameText = (event) => {
    setUsername(event.target.value);
  };
  const handleBirthdayText = (event) => {
    setBirthday(event.target.value);
  };
  const handleLastNameText = (event) => {
    setLastName(event.target.value);
  };
  const handleFirstNameText = (event) => {
    setFirstName(event.target.value);
  };
  const handleCityText = (event) => {
    setCity(event.target.value);
  };
  const handlePostNumberText = (event) => {
    setPostNumber(event.target.value);
  };
  const handleAddressText = (event) => {
    setAddress(event.target.value);
  };
  return (
    <StyledMemberInfo>
      <StyledContainer>
        <StyledInfoContainer>
          <div className="memberInfo__title">
            <h2>Member Info</h2>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                value={email || ""}
                disabled={!isEdit}
                onChange={handleEmailText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                value={username || ""}
                disabled={!isEdit}
                onChange={handleUsernameText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Birthday"
                variant="outlined"
                type="date"
                value={birthday || ""}
                disabled={!isEdit}
                onChange={handleBirthdayText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                disabled={!isEdit}
                value={firstName || ""}
                onChange={handleFirstNameText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                disabled={!isEdit}
                value={lastName || ""}
                onChange={handleLastNameText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                disabled={!isEdit}
                value={city || ""}
                onChange={handleCityText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Post Number"
                variant="outlined"
                disabled={!isEdit}
                value={postNumber || ""}
                onChange={handlePostNumberText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                disabled={!isEdit}
                value={address || ""}
                onChange={handleAddressText}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={isEdit ? "contained" : "outlined"}
                onClick={isEdit ? handleConfirm : handleUpdate}
              >
                {isEdit ? "CONFIRM" : "UPDATE"}
              </Button>
            </Grid>
          </Grid>
        </StyledInfoContainer>
      </StyledContainer>
    </StyledMemberInfo>
  );
};

export default MemberInfoPage;
