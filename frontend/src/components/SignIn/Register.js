import { Space, Button, Tag, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@mui/material/IconButton";

import { useManage } from '../../containers/hooks/useManage.js';

const Register = () => {
  const {
    name,
    setName,
    signedIn,
    setSignedIn,
    password,
    setPassword,
    onLogin,
    onRegister,
    errMsg,
    setErrMsg,
    loadUser,
  } = useManage();

  return (
    <>
      <div style={{ margin: 10 }}>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          style={{ marginBottom: 10 }}
        >
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Account name"
              size="medium"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      {errMsg ? <div>{errMsg}</div> : <></>}
      <Space direction="horizontal">
        <Button
          shape="round"
          type="primary"
          style={{ width: 80, margin: 15, height: 35, background: "#0000b3" }}
          onClick={() => {
            if (!name || !password) {
                setErrMsg("Name/Password cannot be empty!");
                return;
            }
            onRegister({
              variables: {
                name,
                password,
              },
              onError: (err) => {
                // eslint-disable-next-line no-console
                if (err.message === "USER_EXIST") {
                  setErrMsg("The user has already exist!");
                } else {
                  setErrMsg("Error");
                }
              },
              onCompleted: () => {
                setErrMsg("");
                loadUser({
                  variables: {
                    name: name,
                  }
                })
                setSignedIn(false);
              },
            });
          }}
        >
          Register
        </Button>
        <Button
          shape="round"
          type="primary"
          style={{ width: 80, margin: 15, height: 35, background: "#0000b3" }}
          onClick={() => {
            if (!name || !password) {
                setErrMsg("Name/Password cannot be empty!");
                return;
            }
            onLogin({
              variables: {
                name,
                password,
              },
              onError: (err) => {
                // eslint-disable-next-line no-console
                if (err.message === "USER_NOT_FOUND") {
                  setErrMsg("The user has not registered yet!");
                } else if (err.message === "WRONG_PASSWORD") {
                  setErrMsg("Wrong password!");
                } else {
                  setErrMsg("Error");
                }
              },
              onCompleted: () => {
                setErrMsg("");
                loadUser({
                  variables: {
                    name: name,
                  }
                })
                setSignedIn(false);
              },
            });
          }}
        >
          Login
        </Button>
      </Space>
    </>
  );
};

export default Register;
