import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { signInWithGoogle, auth } from '../../config/firebase';
import { AuthContainer, AuthMainButton, AuthOr, AuthGoogleButton } from './styles';
import { Flex, Input } from '../Lib';
import googleLogo from '../../media/google.png';


export default function Signin () {
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ email, password }: { email: string, password: string }) => {
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => console.log('Error Signing in with email and password'));
  }

  return (
    <AuthContainer>
      <Flex flexDirection="column">
        <h1>React Template</h1>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="email" ref={register({ required: true })} placeholder="Email" />
        <Input name="password" ref={register({ required: true })} placeholder="Password" />
        <AuthMainButton type="submit">SIGN IN</AuthMainButton>
        <Link to="/password-reset">Forgot password?</Link>
        <AuthOr><legend>or</legend></AuthOr>
        <AuthGoogleButton onClick={() => signInWithGoogle()}>
          <img src={googleLogo} alt="Google Logo" />
          <span>Sign in with Google</span>
        </AuthGoogleButton>
      </form>
      <Link to="/signup">Not a member yet? Create a <strong>free</strong> account</Link>
    </AuthContainer>
  );
}