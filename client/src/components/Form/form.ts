import { emailPattern } from '../../utility/patterns';

const form = {
  name: {
    required: true,
    maxLength: 18,
  },
  email: {
    required: true,
    pattern: emailPattern
  },
  age: {
    required: true,
    min: 18,
    max: 35
  },
  check: {
    required: true,
    validate: (value: string) => value === 'Hello world!'
  }
}

export default form;