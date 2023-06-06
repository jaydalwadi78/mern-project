import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import CONFIG from "../../../config";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [authenticated, setauthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      navigate('/dashboard/app');
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!username) {
        setUsernameErrorText("Please enter username");
      } else {
        setUsernameErrorText("");
      }
      if (!password) {
        setPasswordErrorText("Please enter password");
      } else {
        setPasswordErrorText("");
      }
      axios.post(`${CONFIG.API_ENDPOINT}signin`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          localStorage.setItem('Id', res.data.admin._id);
          localStorage.setItem('UserName', res.data.admin.username);
          setauthenticated(true)
          localStorage.setItem("authenticated", true);
          navigate('/dashboard', { replace: true });

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      setPassword('')
      console.log(e)
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="text" label="Username" required onChange={e => setUserName(e.target.value)}
          value={username}
          error={!!usernameErrorText}
          helperText={usernameErrorText}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          error={!!passwordErrorText}
          helperText={passwordErrorText}
          required
          onChange={e => setPassword(e.target.value)}
        />
      </Stack>

      <br />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={(e) => handleClick(e)}>
        Login
      </LoadingButton>
    </>
  );
}
