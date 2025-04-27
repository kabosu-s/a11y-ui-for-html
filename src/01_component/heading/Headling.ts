import './headling.css';

export interface LogoProps {
  name: string;
}

export const createHeadlogo = ({ name }: LogoProps) => {
    return  /* html */ `
    <h1 class="header">${name}</h1>
  `;
};