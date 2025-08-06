import { Metadata } from 'next';
import LoginSection from './LoginSectionn';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function LoginPage() {
  return <LoginSection />;
}
