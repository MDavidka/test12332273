import { ComponentProps } from '../types';

interface LoginFormProps extends ComponentProps {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm(props: LoginFormProps): HTMLElement {
  const form = document.createElement('form');
  form.className = `bg-white rounded-md shadow-md p-4 ${props.className || ''}`;
  form.innerHTML = `
    <div class="mb-4">
      <label class="block text-color-text text-sm font-bold mb-2" for="email">Email</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-color-text leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
    </div>
    <div class="mb-6">
      <label class="block text-color-text text-sm font-bold mb-2" for="password">Password</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-color-text mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-color-primary hover:bg-color-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-color-primary hover:text-color-secondary" href="#">
        Forgot Password?
      </a>
    </div>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector<HTMLInputElement>('#email');
    const passwordInput = form.querySelector<HTMLInputElement>('#password');
    if (emailInput && passwordInput) {
      props.onSubmit(emailInput.value, passwordInput.value);
    }
  });

  return form;
}