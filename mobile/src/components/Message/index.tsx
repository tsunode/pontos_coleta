import React from 'react';

import { Container, MessageText } from './styles';

interface MessageProps {
  children: string;
}

const Message: React.FC<MessageProps> = ({ children }) => {
  return (
    <Container>
      <MessageText>{children}</MessageText>
    </Container>
  );
};

export default Message;
