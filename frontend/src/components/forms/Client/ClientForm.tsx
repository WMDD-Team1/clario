import Loader from '@components/Loader';
import Success from '@components/Success';
import { useState } from 'react';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import { ClientUploadSuccess } from '@assets/icons';
import { useAuth0 } from '@auth0/auth0-react';
import FormFooter from '../FormFooter';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  notes: z.string().optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface Props {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const ClientForm = ({ onCancel, onSuccess }: Props) => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      notes: '',
      address: {
        street: '',
        postalCode: '',
        city: '',
        country: '',
      },
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    setLoader(true);
    setSuccess(false);

    const payload = {
      ...data,
      type: 'Individual',
    };

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      console.log('Token:', token);
      console.log('Payload:', payload);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/clients`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response.data);

      setLoader(false);
      setSuccess(true);

      onSuccess?.();
      setTimeout(()=>{onCancel()},500)
    } catch (error) {
      setLoader(false);
      console.error('Error saving client:', error);
    }
  };


  if (loader) {
    return (
      <div className="flex flex-col h-full justify-center">
        <Loader />
      </div>
    );
  }


  if (success) {
    return (
      <Success title="Client Added successfully." p1="The details have been added to your records.">
        <ClientUploadSuccess className="w-25 h-25" />
      </Success>
    );
  }


  return (
    <form className="flex flex-col gap-[1.5rem]">
      {/* Client Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Client Name"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
          </Input>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Phone"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
          </Input>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Email"
            type="email"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </Input>
        )}
      />

      {/* Notes */}
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Notes"
            color="bg-[var(--general-alpha)]"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* Address Section */}
      <p>Client's Address</p>

      {/* Street Address */}
      <Controller
        name="address.street"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Street Address"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.address?.street && (
              <p style={{ color: 'red' }}>{errors.address.street.message}</p>
            )}
          </Input>
        )}
      />

      {/* Postal Code */}
      <Controller
        name="address.postalCode"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Postal Code"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.address?.postalCode && (
              <p style={{ color: 'red' }}>{errors.address.postalCode.message}</p>
            )}
          </Input>
        )}
      />

      {/* City */}
      <Controller
        name="address.city"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="City"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.address?.city && <p style={{ color: 'red' }}>{errors.address.city.message}</p>}
          </Input>
        )}
      />

      {/* Country */}
      <Controller
        name="address.country"
        control={control}
        render={({ field }) => (
          <Input
            color="bg-[var(--general-alpha)]"
            label="Country"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.address?.country && (
              <p style={{ color: 'red' }}>{errors.address.country.message}</p>
            )}
          </Input>
        )}
      />

      {/* Footer Buttons */}
      <FormFooter
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        disableSubmit={isSubmitting}
        submitLabel={isSubmitting ? 'Saving...' : 'Save'}
      />
    </form>
  );
};
