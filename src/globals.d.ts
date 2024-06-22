import { EnvironmentVariables } from './env.interface';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}
