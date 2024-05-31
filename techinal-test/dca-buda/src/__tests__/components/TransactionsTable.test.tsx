// TransactionsTable.test.js
import React from 'react';
import { render } from '@testing-library/react';
import TransactionsTable from '@/components/TransactionsTable';


describe('TransactionsTable component', () => {
      test("Renders without data", () => {
        const { getByText } = render(<TransactionsTable transactions={[]} />);
    
        expect(getByText("Transacciones")).toBeInTheDocument();
        expect(getByText("Fecha")).toBeInTheDocument();
        expect(getByText("Monto invertido acumulado")).toBeInTheDocument();
        expect(getByText("Precio Bitcoin (CLP)")).toBeInTheDocument();
        expect(getByText("Profit")).toBeInTheDocument();
        expect(getByText("Profit acumulado")).toBeInTheDocument();
        expect(getByText("Total acumulado")).toBeInTheDocument();
        expect(getByText("%")).toBeInTheDocument();
      });
});
