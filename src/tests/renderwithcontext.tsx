import { render } from '@testing-library/react';
import PlanetsProvider from '../context/PlanetsProvider';

const renderWithContext = (ui:  JSX.Element) => {
    return{
    ...render(
        <PlanetsProvider>
            {ui}
        </PlanetsProvider>
    )
    }
}

export default renderWithContext;