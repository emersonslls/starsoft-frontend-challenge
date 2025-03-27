// src/setupTests.ts
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

afterEach(async () => {
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
});
