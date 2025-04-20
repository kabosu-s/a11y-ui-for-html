import { createButton } from '../../01_parts/button/Button';
import { createHeadlogo } from '../../01_parts/heading/Headling';
import './header.css';

export interface HeaderProps {
  user?: { name: string };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const createHeader = ({ user, onLogout, onLogin, onCreateAccount }: HeaderProps) => {
  const header = document.createElement('header');

  const wrapper = document.createElement('div');
  wrapper.className = 'storybook-header';

  const logo = createHeadlogo();

  wrapper.insertAdjacentHTML('afterbegin', logo);

  const account = document.createElement('div');
  if (user) {
    const welcomeMessage = `<span class="welcome">Welcome, <b>${user.name}</b>!</span>`;
    account.innerHTML = welcomeMessage;
    account.appendChild(createButton({ size: 'small', label: 'Log out', onClick: onLogout }));
  } else {
    account.appendChild(createButton({ size: 'small', label: 'Log in', onClick: onLogin }));
    account.appendChild(
      createButton({
        size: 'small',
        label: 'Sign up',
        onClick: onCreateAccount,
        primary: true,
      })
    );
  }
  wrapper.appendChild(account);
  header.appendChild(wrapper);

  return header;
};
