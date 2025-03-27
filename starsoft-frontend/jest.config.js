import nextJest from 'next/jest';
import { resolve } from 'path';

const createJestConfig = nextJest({
  dir: './',  // ou o caminho correto do seu projeto
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Transforma os arquivos JS e TS com Babel
  },
  moduleNameMapper: {
    '^next/image$': resolve('./__mocks__/nextImageMock.js'),  // Mock do next/image
    '^@/(.*)$': '<rootDir>/src/$1',  // Ajuste se você estiver usando alias
  },
};

export default createJestConfig(customJestConfig);
