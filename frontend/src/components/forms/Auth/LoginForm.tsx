import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@components/Input';
import Button from '@components/Button';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useAppDispatch } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
import { googleLogin, login } from '@api/services/authService';
import { fetchUser } from '@store/userSlice';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

const LoginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastSetup, setToastSetup] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login(data.email, data.password);
      const user = await dispatch(fetchUser()).unwrap();

      if (!user.onBoardingCompletedAt) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setToastSetup({ success: false, message: 'Invalid email or password.' });
        } else {
          setToastSetup({ success: false, message: 'Something went wrong. Please try again.' });
        }
      } else {
        setToastSetup({ success: false, message: 'Unexpected error occurred.' });
      }

      setShowToast(true);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);

      const user = await dispatch(fetchUser()).unwrap();

      if (!user.onBoardingCompletedAt) navigate('/onboarding');
      else navigate('/dashboard');
    } catch (err) {
      console.error('Google Login Error:', err);
    }
  };

  return (
    <>
      <form className="space-y-[30px]" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Email"
            id="email"
            placeholder="Enter Your Email"
            type="email"
            register={register('email')}
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Input
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            register={register('password')}
            endAdornment={
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
              </div>
            }
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
          )}
          <div className="flex justify-between items-center text-sm mt-[10px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="cursor-pointer" />
              <span className="text-[var(--primary-text)]">Remember me</span>
            </label>

            <button type="button" className="text-[#3C3C3C] hover:underline">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" buttonColor="regularButton" width="100%" textColor="#fff">
          Login
        </Button>

        <div className="flex justify-center items-center gap-[30px]">
          <span className="text-sm text-black font-bold ">Or</span>
        </div>

        {/* <button className="gsi-material-button">
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              style={{ display: 'block' }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">Sign in with Google</span>
          <span style={{ display: 'none' }}>Sign in with Google</span>
        </div>
      </button> */}
        <GoogleLogin
          locale="en"
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Google Login Failed')}
        />
      </form>
      <Snackbar open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
        <Alert
          severity={toastSetup?.success ? 'success' : 'error'}
          sx={{
            backgroundColor: `var(${
              toastSetup?.success
                ? '--primitive-colors-success-500'
                : '--primitive-colors-error-500'
            })`,
            color: 'white',
          }}
        >
          {toastSetup?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
