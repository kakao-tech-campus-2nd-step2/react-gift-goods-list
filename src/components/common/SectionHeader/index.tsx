import React from 'react';
import styled from '@emotion/styled';
import { CenteredContainer } from '@components/common';
import { useLocation } from 'react-router-dom';

interface LocationState {
  title: string;
  label: string;
  description?: string;
  backgroundColor: string;
}

export default function SectionHeader() {
  const location = useLocation();
  const { title, description, label, backgroundColor } = location.state as LocationState;

  return (
    <SectionHeaderContainer color={backgroundColor}>
      <CenteredContainer maxWidth="md">
        <Label>{label}</Label>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CenteredContainer>
    </SectionHeaderContainer>
  );
}

const SectionHeaderContainer = styled.section<{ color?: string }>`
  margin-top: 60px;
  background-color: ${({ color }) => color};
  padding: 50px 0;
`;

const Label = styled.p`
  font-size: 20px;
  color: #ffffffb3;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  padding-top: 12px;
`;

const Description = styled.p`
  font-size: 24px;
  color: #ffffff8c;
  padding-top: 12px;
`;
