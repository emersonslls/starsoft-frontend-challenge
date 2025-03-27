// src/setupTests.ts

import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

// Estendendo Jest para incluir o matcher 'toHaveNoViolations'
expect.extend(toHaveNoViolations);
