import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { ResponseResult } from '../../data-access/interface/response.type';

export const SHOW_LOADING = new HttpContextToken<boolean>(() => true);
export const SHOW_API_MESSAGE = new HttpContextToken<boolean>(() => true);
export const SHOW_API_ERROR_MESSAGE = new HttpContextToken<boolean>(() => true);

export const interceptors: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const showLoading = req.context.get(SHOW_LOADING);
  const showApiMessage = req.context.get(SHOW_API_MESSAGE);
  const showApiErrorMessage = req.context.get(SHOW_API_ERROR_MESSAGE);
  const token = localStorage.getItem('token'); //custom
  req = req.clone({
    url: !req.url.includes('http') ? environment.API_DOMAIN + req.url : req.url,
    setHeaders: {
      Authorization: `Bearer ${token ? token : ''}`,
      StandardTimeZoneName: `${
        Intl.DateTimeFormat().resolvedOptions().timeZone
      }`,
    },
  });
  runIf(showLoading, () => {});
  return next(req).pipe(
    tap({
      next: (response) => {
        if (response.type === HttpEventType.Response) {
          if (response && response.body) {
            const apiType = checkApiType(response);
            if (apiType === 'success') {
              const resp = response.body as ResponseResult<unknown>;
              runIf(
                showApiMessage && !!resp.message && req.method !== 'GET',
                () => {}
              );
            } else if (apiType === 'error') {
              const resp = response.body as ResponseResult<unknown>;
              runIf(!resp.success && !!resp.message, () => {});
            }
          }
        }
      },
      finalize: () => runIf(showLoading, () => {}),
    }),
    catchError(
      (error: HttpErrorResponse, _: Observable<HttpEvent<unknown>>) => {
        const apiError = error.error as ResponseResult<unknown> | Blob | null;
        if (apiError instanceof Blob) {
          apiError.text().then((val) => {
            const errors = JSON.parse(val);
            runIf(showApiErrorMessage, () => {
              //   console.log('error: ', val);
            });
          });
          return EMPTY;
        }

        if (error.status === HttpStatusCode.InternalServerError) {
          //   console.log('error: InternalServerError');
          return EMPTY;
        }

        // sandbox api
        if (error.error === '404 Page Not Found' && showApiErrorMessage) {
          //   console.log('error: ', error.error);
          return EMPTY;
        }

        // if (error.status === HttpStatusCode.Unauthorized) {
        //   // authStore.signOut();
        //   //   console.log('error: Unauthorized');
        //   return EMPTY;
        // }

        if (error.status === HttpStatusCode.Forbidden) {
          //authStore.signOut();
          //   console.log('error: Forbidden');
          return EMPTY;
        }

        if (!apiError?.message) {
          //   console.log('error: ???');
          return EMPTY;
        }
        return throwError(() => apiError);
      }
    )
  );
};

function runIf(isShowMessage: boolean, func: () => void) {
  if (isShowMessage) {
    func();
  }
}

function checkApiType(
  httpResponse: HttpResponse<unknown>
): 'success' | 'error' {
  return Object.hasOwn(httpResponse.body as object, 'res')
    ? 'error'
    : 'success';
}
