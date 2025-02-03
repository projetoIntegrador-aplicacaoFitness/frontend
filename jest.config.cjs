module.exports = {
  testEnvironment: 'jsdom', // Ambiente de teste para React
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Padrão para encontrar arquivos de teste
  testPathIgnorePatterns: ['/node_modules/'], // Ignorar a pasta node_modules
  passWithNoTests: true, // Não falhar se nenhum teste for encontrado
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transformar arquivos JS/TS com Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapear imports de CSS
  },
};