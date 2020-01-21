module.exports = {
  sourceMaps: true,
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods'
  ]
};
