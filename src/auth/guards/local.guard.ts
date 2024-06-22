import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserInput } from '../dto/login.input';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  // constructor() {
  //   super();
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const { input }: { input: LoginUserInput } = ctx.getArgs();
    Object.assign(gqlReq.body, input);
    return gqlReq;
  }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const ctx = GqlExecutionContext.create(context).getContext();
  //   const result = (await super.canActivate(ctx)) as boolean;
  //   await super.logIn(ctx.req);
  //   return result;
  // }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const ctxRequest = GqlExecutionContext.create(context).getContext().req;
  //   await super.logIn(ctxRequest);
  //   return ctxRequest ? true : false;
  // }
}
