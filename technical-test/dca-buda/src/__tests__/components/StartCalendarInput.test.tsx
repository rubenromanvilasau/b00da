import StartCalendarInput from "@/components/StartCalendarInput";
import { render, screen } from "@testing-library/react";

    jest.mock('next/navigation', () => ({
        useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
        usePathname: jest.fn().mockReturnValue('/'),
        useRouter: jest.fn(() => ({ replace: jest.fn() })),
    }));

describe("StartCalendarInput component", () => {

    it('renders without crashing', () => {
        render(<StartCalendarInput defaultDate={new Date(2024,5,1)}/>);
        const datePicker = screen.getByLabelText('Fecha de inicio de inversión');
        expect(datePicker).toBeInTheDocument();
    });

});