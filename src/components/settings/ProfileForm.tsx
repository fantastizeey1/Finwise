// src/components/settings/ProfileForm.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Required'),
  username: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  dateOfBirth: z.string().optional(),
  city: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onLoadingChange: Dispatch<SetStateAction<boolean>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onLoadingChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    onLoadingChange(true);
    try {
      // simulate API
      await new Promise(r => setTimeout(r, 800));
      console.log('Profile updated:', data);
    } catch {
      console.error('Update failed');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          <img
            src={profileImage || '/placeholder-profile.jpg'} // fallback image
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 right-0 p-1 rounded-full cursor-pointer"
          >
            <img src="/edit.svg" alt="edit icon" className="w-10 h-10" />
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            placeholder="Upload profile picture"
            title="Upload profile picture"
          />
        </div>
        <p className="text-sm text-gray-500">Upload profile picture</p>
      </div>

      {/* Form Section */}
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="mb-3">
                Full Name
              </Label>
              <Input id="fullName" {...register('fullName')} />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <Label htmlFor="username" className="mb-3">
                Username
              </Label>
              <Input id="username" {...register('username')} />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="">
              <Label htmlFor="email" className="mb-3">
                Email
              </Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="">
              <Label htmlFor="password" className="mb-3">
                Password
              </Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth" className="mb-3">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      readOnly
                      placeholder="Select date"
                      value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                      className="pr-10 cursor-pointer"
                      {...register('dateOfBirth')}
                    />
                    <Calendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-white rounded-lg shadow-lg">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={date => {
                      setSelectedDate(date ?? undefined);
                      if (date) setValue('dateOfBirth', date.toISOString());
                    }}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city" className="mb-3">
                City
              </Label>
              <Input id="city" {...register('city')} />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="mb-3">
                Address
              </Label>
              <Input id="address" {...register('address')} />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <Label htmlFor="state" className="mb-3">
                State
              </Label>
              <Input id="state" {...register('state')} />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>

            {/* Postal Code */}
            <div>
              <Label htmlFor="postalCode" className="mb-3">
                Postal Code
              </Label>
              <Input id="postalCode" {...register('postalCode')} />
              {errors.postalCode && (
                <p className="text-red-600 text-sm mt-1">{errors.postalCode.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country" className="mb-3">
                Country
              </Label>
              <Input id="country" {...register('country')} />
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-6 text-white border-blue-600 bg-blue-500">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
