import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

const proxy = createProxyMiddleware({
  target: process.env.GQL_REMOTE_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/graphql': '/'
  }
});

export default proxy;
