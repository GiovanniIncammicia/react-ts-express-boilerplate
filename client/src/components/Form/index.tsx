import React from 'react';
import { FormStyled, FormButtons } from './styles';
import { useForm } from 'react-hook-form';
import { Input } from '../Lib';
import form from './form';

export default function Form () {
  const { register, errors, handleSubmit, reset } = useForm();
  const onSubmit = async ({ email }: { email: string }) => {
    try {
      console.log(email);
      alert("sent!");
    }
    catch(error){
      console.log('Error Signing up with email and password');
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" ref={register(form.name)} placeholder="Name" />
      { errors.name && <span>Name is required</span>}
      <Input name="lastname" ref={register} placeholder="Last Name" />

      <Input name="email" ref={register(form.email)} placeholder="Email" />
      { errors.email && <span>Email is invalid</span>}
      <Input type="number" name="age" ref={register(form.age)} placeholder="Age" />
      { errors.age?.type === 'required' && <span>Age is required</span>}
      { errors.age?.type === 'min' && <span>You have to be over 18 to submit</span>}
      { errors.age?.type === 'max' && <span>You have to be under 35 to submit</span>}
      <Input name="check" ref={register(form.check)} placeholder="Write 'Hello world!'" />
      {errors.check && <span>Write "Hello world!"</span>}
      <FormButtons>
        <input type="reset" value="🗙 Reset"/>
        <button onClick={() => reset({ check: "Hello world!" })}>🗙 Reset with default values</button>
        <button type="submit">Submit</button>
      </FormButtons>
    </FormStyled>
  );
}