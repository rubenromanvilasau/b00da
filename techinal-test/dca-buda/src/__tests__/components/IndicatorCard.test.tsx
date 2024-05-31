import { render } from "@testing-library/react";
import IndicatorCard from "@/components/IndicatorCard";

describe('IndicatorCard component', () => {
    it('should render without crashing', () => {
        render(<IndicatorCard type="invested" data={1000}/>);
    })
});