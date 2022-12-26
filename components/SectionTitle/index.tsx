/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';

interface Props {
  title: string;
}
const SectionTitle: React.FC<Props> = ({ title }) => {
  return <h2 className="font-roboto-bold text-xl">{title}</h2>;
};

export default SectionTitle;
