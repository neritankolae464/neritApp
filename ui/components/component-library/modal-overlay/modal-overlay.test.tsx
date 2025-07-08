import React from 'react';
import { render } from '@testing-library/react';
import { ModalOverlay } from './modal-overlay';

describe('ModalOverlay', () => {
  it('renders without error and has correct class', () => {
    const { getByTestId } = render(<ModalOverlay data-testid="modal-overlay" />);
    const overlay = getByTestId('modal-overlay');
    expect(overlay).toBeDefined();
    expect(overlay).toHaveClass('mm-modal-overlay');
  });

  it('matches snapshot', () => {
    const { container } = render(<ModalOverlay />);
    expect(container).toMatchSnapshot();
  });

  it('renders with additional className', () => {
    const { getByTestId } = render(
      <ModalOverlay data-testid="modal-overlay" className="test-class" />
    );
    expect(getByTestId('modal-overlay')).toHaveClass('test-class');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ModalOverlay data-testid="modal-overlay" onClick={onClick} />
    );
    getByTestId('modal-overlay').click();
    expect(onClick).toHaveBeenCalled();
  });
});
