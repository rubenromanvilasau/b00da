import { render, screen, fireEvent } from '@testing-library/react';
import AmountInput from '../../components/AmountInput';
import { useRouter } from 'next-router-mock';

// jest.mock('next/navigation', () => ({
    // ...require('next-router-mock'),
    // useSearchParams: () => [[{ revalidate: '1' }]],
    // usePathname: jest.fn().mockReturnValue('/test-path'),
    // searchParams: jest.fn().mockReturnValue(new URLSearchParams('amount=100')),
    // useRouter,
// }));

jest.mock('next/navigation', () => {
    const { useRouter } = require('next-router-mock')
    const usePathname = () => {
      const router = useRouter()
      return router.pathname
    }
  
    const useSearchParams = () => {
      const router = useRouter()
      return new URLSearchParams(router.query)
    }
  
    return {
      useRouter,
      usePathname,
      useSearchParams
    }
});

const mockSearchParams = new URLSearchParams({ amount: "3000" });

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/search"),
  useSearchParams: jest.fn().mockReturnValue(mockSearchParams),
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

test("Renders with query string param", () => {
  const { getByLabelText } = render(
    <AmountInput currency="GBP" defaultValue={0} />
  );

  expect(getByLabelText("Amount")).toBeInTheDocument();
});

describe('AmountInput component', () => {
    
    it("renders input correctly", () => {
        render(<AmountInput currency="CLP" defaultValue={100}/>);
        expect(screen.getByText('CLP')).toBeInTheDocument();
    })

    test('renders the component with default value', () => {
        render(<AmountInput currency="CLP" defaultValue={100} />);
        
        const input = screen.getByPlaceholderText('Amount');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(100);
        
        const currencyLabel = screen.getByText('CLP');
        expect(currencyLabel).toBeInTheDocument();
    });

    
});
