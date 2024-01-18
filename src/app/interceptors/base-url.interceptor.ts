import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let urlPath: string = "https://syntra2023.code-coaching.dev/api";
  const endpoint: string = _formatEndpoint(req.url);

  if (!endpoint.startsWith('/token')){
    urlPath = urlPath + "/group-2";
  }

  req = req.clone({url: urlPath + endpoint});
  return next(req);
};

function _formatEndpoint(endpoint: string): string {
  const noBackslashAtStart: boolean = !(endpoint.startsWith("/"));
  if (noBackslashAtStart) {
    endpoint = '/' + endpoint;
  }

  const noBackslashAtEnd: boolean = !(endpoint.endsWith("/"));
  if (noBackslashAtEnd) {
    endpoint = endpoint + '/';
  }

  return endpoint;
}