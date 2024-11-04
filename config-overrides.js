const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
  };

  // 확장자 처리 추가
  config.resolve.extensions = ['.js', '.jsx', '.json'];

  // 경고 무시 설정 추가
  config.ignoreWarnings = [
    {
      module: /@fullpage\/react-fullpage/, // 해당 모듈의 경고 무시
      message: /Failed to parse source map/, // source map 파싱 실패 경고 무시
    },
  ];

  return config;
};