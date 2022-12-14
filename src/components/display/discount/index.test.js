import { render, screen } from '@testing-library/react';
import DiscountDisplay from './index';

describe('Discount display', () => {
    test('Should show -10%', () => {
      render(
        <DiscountDisplay discount={10} />);
        
        const discount = screen.queryByText('-10%');
        expect(discount).toBeInTheDocument();
    });

    test('Should not show -0%', () => {
      render(
        <DiscountDisplay discount={0} />);
        
        const discount = screen.queryByText('-0%');
        expect(discount).not.toBeInTheDocument();
    });
});
