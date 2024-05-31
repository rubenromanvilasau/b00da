import { render, screen, fireEvent } from "@testing-library/react";
import AmountInput from "@/components/AmountInput";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn().mockReturnValue("/search"),
    useSearchParams: jest
        .fn()
        .mockReturnValue(new URLSearchParams({ amount: "100" })),
    useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

describe("AmountInput component", () => {
    it("renders input correctly", () => {
        render(<AmountInput currency="CLP" defaultValue={100} />);
        expect(screen.getByText("CLP")).toBeInTheDocument();
    });

    it("updates the input value on user change", () => {
        render(<AmountInput currency="CLP" defaultValue={100} />);

        const input = screen.getByPlaceholderText("Monto");
        fireEvent.change(input, { target: { value: "250" } });

        expect(input).toHaveValue(250);
    });

    it("Renders with it's label", () => {
        const { getByLabelText } = render(
            <AmountInput currency="CLP" defaultValue={0} />
        );

        expect(getByLabelText("Monto")).toBeInTheDocument();
    });

    it("renders the component with default value", () => {
        render(<AmountInput currency="CLP" defaultValue={100} />);

        const input = screen.getByPlaceholderText("Monto");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(100);

        const currencyLabel = screen.getByText("CLP");
        expect(currencyLabel).toBeInTheDocument();
    });
});
