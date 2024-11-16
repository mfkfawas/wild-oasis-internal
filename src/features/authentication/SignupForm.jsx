import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { isLoading, signup } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    watch,
  } = useForm();

  // Watch all fields
  const formValues = watch();

  // Check if all fields are empty when any field changes
  const areFieldsEmpty = Object.values(formValues).some(
    value => value === '' || value == null
  );

  // react hook form will call this fn each time the form is submitted and each time the validation happens, and since the validation is already
  // happened before then we not need any validation here(cool right?)
  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Full name is required' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            validate: value =>
              value === getValues('password') || 'Passwords must match',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading || areFieldsEmpty}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
