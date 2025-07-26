import * as React from 'react';
import { render } from '@testing-library/react';
import { Severity } from '../../../../helpers/constants/design-system';
import InlineAlert from './inline-alert';

const onClickMock = jest.fn();

describe('Inline Alert', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  ['danger', 'warning'].forEach(severity => {
    it(`renders alert with ${severity} severity`, () => {
      const { container } = render(
        <InlineAlert onClick={onClickMock} severity={Severity[severity]} />,
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('renders alert with informative severity', () => {
    const { container } = render(<InlineAlert onClick={onClickMock} />);

    expect(container).toMatchSnapshot();
  });
});
