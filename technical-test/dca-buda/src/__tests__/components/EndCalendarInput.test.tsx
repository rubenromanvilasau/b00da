
import EndCalendarInput from "@/components/EndCalendarInput";
import { render, screen } from "@testing-library/react";

    jest.mock('next/navigation', () => ({
        useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
        usePathname: jest.fn().mockReturnValue('/'),
        useRouter: jest.fn(() => ({ replace: jest.fn() })),
    }));

describe("EndCalendarInput component", () => {

    it('renders without crashing', () => {
        render(<EndCalendarInput defaultDate={new Date(2024,5,1)}/>);
        const datePicker = screen.getByLabelText('Fecha de término de inversión');
        expect(datePicker).toBeInTheDocument();
    });

});