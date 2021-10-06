import * as React from 'react';
// libs
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const Subtitle = styled.h4`
  color: #bdc75c;
`;

const ContentBlock = styled.div`
  padding: 0;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

interface IIncomingProps {
  codeTx: string;
  label: string;
}

const CodeBlock: React.FC<IIncomingProps> = ({ codeTx, label }) => (
  <>
    <Subtitle>{label}</Subtitle>
    <ContentBlock>
      <SyntaxHighlighter style={dracula} language='typescript'>
        {codeTx}
      </SyntaxHighlighter>
    </ContentBlock>
  </>
);

export { CodeBlock };
