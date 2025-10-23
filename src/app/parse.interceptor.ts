import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

const APPLICATION_ID = 'ZjTsB45A8NzYtNy0LuAGc37bImSEPtA75PGMCPOR';
const JAVASCRIPT_KEY = 'DzsqmWwUbPLdp3mQtkqq4E7owYY4ISVOfH9sn3iQ';

export const parseInterceptor: HttpInterceptorFn = (req, next) => {
    const authReq = req.clone({
        headers: req.headers
            .set('X-Parse-Application-Id', APPLICATION_ID)
            .set('X-Parse-JavaScript-Key', JAVASCRIPT_KEY)
            .set('Content-Type', 'application/json')
    });

    return next(authReq);
};
