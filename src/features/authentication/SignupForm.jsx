import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  // react hook form will call this fn each time the form is submitted and each time the validation happens, and since the validation is already
  // happened before then we not need any validation here(cool right?)
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Full name is required' })}
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
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
