import styled from 'styled-components';

interface Props {
  settings?: boolean;
  primary?: boolean;
}

const Button = styled.button<Pick<Props, 'settings' | 'primary'>>`
  padding: ${(props) => (props.settings ? '8px' : '12px')};
  border: 0px;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => (props.primary ? '#fff' : 'inherit')};
  border-radius: 8px;
  margin: 4px;
  cursor: pointer;
  background: ${(props) =>
    props.primary ? '#52a2aa' : props.settings ? '#fff' : '#ddd'};
`;

export default Button;
