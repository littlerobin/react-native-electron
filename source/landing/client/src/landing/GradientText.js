// @flow
import styled from 'styled-components';

import variables from '../ui/variables';

export const GradientText = styled.div`
  display: inline;
  background: linear-gradient(
    to right,
    ${variables.colorRedLight},
    ${variables.colorRedDark}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default GradientText;
