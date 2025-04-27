import { createButton } from '../../01_component/button/Button';
import { createHeadlogo } from '../../01_component/heading/Headling';
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
  wrapper.className = 'sb_header';

  const logo = createHeadlogo({ name: 'LOGO'});
  wrapper.insertAdjacentHTML('afterbegin', logo);
  const account = document.createElement('div');
  account.className = 'sb_account';
  if (user) {
    const welcomeMessage = `<span class="welcome">${user.name}</span>`;
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
