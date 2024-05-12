import { Input } from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../pages/public/Login';

interface LabeledTextInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email';
  register?: UseFormRegister<FormValues>;
  hookFormType?: 'email' | 'password';
}
export const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  id, label, type = 'text', register, hookFormType: hookFormId,
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
