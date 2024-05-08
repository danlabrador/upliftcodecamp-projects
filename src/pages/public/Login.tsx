import { useGoogleSSO } from '@/hooks/useGoogleSSO';
import { WhiteLogo } from '../../components/WhiteLogo';
import { LoginFeatureImage } from '../../components/LoginFeatureImage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLoginForm } from '@/hooks/useLoginForm';
import { UseFormRegister } from 'react-hook-form';

type FormValues = {
  email: 'dan@upliftcodecamp.com';
  password: 'swordfish';
};

interface LabeledInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email';
  register?: UseFormRegister<FormValues>;
  hookFormType?: 'email' | 'password';
}

const LabeledTextInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  hookFormType: hookFormId,
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {register && hookFormId ? (
      <Input {...register(hookFormId)} id={id} type={type} />
    ) : (
      <Input id={id} type={type} />
    )}
  </div>
);

const Login = () => {
  useGoogleSSO();
  const { errors, isSubmitting, handleSubmit, onSubmit, register } = useLoginForm();
  return (
    <div className="flex h-svh flex-col md:flex-row">
      <aside className="flex items-end relative w-full md:w-1/2">
        <LoginFeatureImage />
        <WhiteLogo />
      </aside>
      <main className="flex justify-center items-center w-full pb-40 md:p-0 lg:p-0 h-svh md:w-1/2">
        <form className="flex flex-col space-y-4 p-8 w-[384px]" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-extrabold text-center">Log in to Lighthouse</h1>
          <LabeledTextInput id="email" label="Email" register={register} hookFormType="email" />
          <LabeledTextInput
            id="password"
            label="Password"
            type="password"
            register={register}
            hookFormType="password"
          />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Login
          </Button>
          <div
            id="g_id_onload"
            data-client_id="744543541785-v89rrt123mnl76h2ek2e3fvbq15erpob.apps.googleusercontent.com"
          />
          {errors.email || errors.password ? (
            <p className="text-red-500 text-sm">Invalid email or password.</p>
          ) : null}
        </form>
      </main>
    </div>
  );
};

export default Login;
