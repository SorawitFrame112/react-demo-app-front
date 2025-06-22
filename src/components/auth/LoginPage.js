import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TextFieldElement } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import React from 'react';
import { loginRequestSchema } from '../../models/auth/LoginRequestDto'
import authService from '../../services/authServices';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
const loginAuth = useAuthStore((state)=>state.login);
const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
   const onSubmit =async (data) => {
    console.log("Form data submitted:", data);
     try {
      const result = await authService.login(data);
      loginAuth(result)
       navigate('/home');
      
      reset(); 
      
    } catch (error) {
      console.error('Error during login:', error.message);
     
    }
  };
  return (
    <Stack
      sx={{
        minHeight: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Card variant="outlined"
       sx={{
          minWidth: 300,   
          maxWidth: 400,  
          padding: 2,      
          boxShadow: 3,   
      }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Login
          </Typography>
            <TextFieldElement
              control={control}
              label="๊UserName"
              name="username"
              helperText={errors.username ? errors.username.message : ''}
                fullWidth
            />
             <TextFieldElement 
              control={control}
              label="Password" 
              name="password" 
              type="password" 
              helperText={errors.password ? errors.password.message : ''}
              margin="normal" 
              fullWidth
            />
            <Stack sx={{ mt: 3, alignItems: 'center' }}>
              <Button variant="contained" type="submit">เข้าสู่ระบบ</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      
    </Stack>
  );
} export default LoginPage;