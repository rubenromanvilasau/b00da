import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

function mockFetch(data: any) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
      }),
    );
}

describe("Home component", () => {
    it('renders without crashing', async () => {
        window.fetch = mockFetch({ trades: {
            entries: [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
        } });

        const data = await Home({});
        expect(data).toBeDefined();
    });
});