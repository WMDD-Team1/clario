import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@components/Input';
import Button from '@components/Button';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Check } from 'lucide-react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { signup } from '@api/services/authService';

const SignUpSchema = z
  .object({
    name: z.string().min(2, 'Full name is required'),
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password') ?? '';
  const email = watch('email') ?? '';
  const name = watch('name') ?? '';
  const hasEightChars = password ? password.length >= 8 : undefined;
  const hasNumberOrSymbol = password ? /[\d!@#$%^&*]/.test(password) : undefined;

  const containsName =
    password && name.length >= 2 ? password.toLowerCase().includes(name.toLowerCase()) : undefined;

  const emailUsername = email.includes('@') ? email.split('@')[0] : '';
  const containsEmail =
    password && emailUsername
      ? password.toLowerCase().includes(emailUsername.toLowerCase())
      : undefined;

  const containsNameOrEmail =
    containsName === undefined && containsEmail === undefined
      ? undefined
      : containsName || containsEmail;
  const strength =
    hasEightChars && hasNumberOrSymbol && !containsNameOrEmail
      ? 'Strong'
      : hasEightChars
        ? 'Medium'
        : 'Weak';

  const Rule = (valid: boolean | undefined, label: string) => (
    <div
      className={classNames(
        'flex items-center gap-2 text-sm',
        valid === undefined
          ? 'text-[var(--sub-text)]'
          : valid
            ? 'text-[var(--primitive-colors-success-600)]'
            : 'text-[var(--sub-text)]',
      )}
    >
      <Check width="1rem" height="1rem" />
      {label}
    </div>
  );
  const onSubmit = async (data: SignUpSchemaType) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const user = await signup(payload);
    if (!user.onBoardingCompletedAt) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          color="text-[var(--primitive-colors-gray-light-mode-500)]"
          label="Full Name"
          placeholder="Enter Your Full Name"
          register={register('name')}
        />
        {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
      </div>

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

        <div className="ml-[30px] mt-[20px] space-y-1 text-sm">
          {Rule(strength !== 'Weak', `Password Strength : ${strength}`)}
          {Rule(
            containsNameOrEmail === undefined ? undefined : !containsNameOrEmail,
            'Cannot contain your name or email address',
          )}
          {Rule(password.length >= 8, 'At least 8 characters')}
          {Rule(hasNumberOrSymbol, 'Contains a number or symbol')}
        </div>
      </div>

      <div>
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Re Enter Password"
          register={register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" buttonColor="regularButton" width="100%" textColor="#fff">
        Create Account
      </Button>
    </form>
  );
};

export default SignUpForm;
