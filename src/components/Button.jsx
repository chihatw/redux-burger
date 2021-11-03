import styled from 'styled-components';

const Button = styled.button`
  padding: ${(props) => (props.settings ? '8px' : '12px')};
  border: 0px;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => (props.primary || props.social ? '#fff' : 'inherit')};
  border-radius: 8px;
  margin: 4px;
  cursor: pointer;
  background: ${(props) =>
    props.primary ? '#52a2aa' : props.settings ? '#fff' : '#ddd'};
`;

export default Button;
