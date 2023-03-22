/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: require('node-libs-react-native'),
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'] //add here
  },
};
