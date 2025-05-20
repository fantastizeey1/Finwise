import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../contexts/AuthProvider';

// Define the validation schema
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setFormError(null);
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // Redirect to dashboard after successful sign in
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('An unexpected error occurred');
      }
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Illustration and branding */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 flex-col p-8 text-white relative">
        <h1 className="text-3xl font-bold mb-8">FinWise</h1>

        <div className="flex flex-col flex-1 overflow-hidden">
          <h2 className="text-[min(5vw,30px)] font-bold ">
            Secure Access to your Dashboard anytime, anywhere
          </h2>

          <div className="flex-grow flex items-center justify-center">
            <img
              src="/sideimg.png"
              alt="side image"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign In</h2>

          {formError && (
            <div
              className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Joe Mike@gmail.com"
                className={classNames(
                  'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.email ? 'border-red-500' : 'border-gray-300'
                )}
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-blue-500 hover:text-blue-600 text-sm">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="******************"
                className={classNames(
                  'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.password ? 'border-red-500' : 'border-gray-300'
                )}
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
