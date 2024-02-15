import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {

        // const request = context.switchToHttp().getRequest();
        // const method = request.method;
        // const path = request.url;

        // // 요청 전의 실행
        // console.log('Interceptor: Request is intercepted');
        // console.log(`Interceptor: Request is intercepted - Method: ${method}, Path: ${path}`);

        // 요청 후의 실행
        return next.
            handle()
            .pipe(map((data) => (data === undefined ? null : data)));
    }
}