import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../contexts/AuthProvider';

// Define the validation schema
const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password is required'),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setFormError(null);
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('An unexpected error occurred');
      }
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Illustration and branding */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 flex-col p-8 text-white h-screen relative">
        <h1
          className="text-3xl font-bold mb-8
        "
        >
          FinWise
        </h1>

        <div className="flex flex-col flex-1 overflow-hidden ">
          <h2 className="text-[min(10vw,50px)] font-bold mb-4">Manage Your Finances</h2>
          <p className="text-3xl mb-8 mr-16">
            Track your expenses, plan your budget, and achieve your financial goals.
          </p>

          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src="/sideimg.png"
              alt="side illustration"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>

          {formError && (
            <div
              className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Joe Mike"
                className={classNames(
                  'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                )}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

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
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
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

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="******************"
                className={classNames(
                  'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                )}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                {...register('agreeToTerms')}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-500 hover:text-blue-600">
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
