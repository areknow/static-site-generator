require.config({
  baseUrl: '/assets/js/',
  paths: {
    "jquery": 'https://code.jquery.com/jquery-3.2.1.min'
  },
  shim: {
    "jquery": {
      exports: '$'
    },
  }
});