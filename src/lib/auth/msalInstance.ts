import {
  PublicClientApplication,
  type IPublicClientApplication,
} from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

let msalInstance: IPublicClientApplication | null = null;

export function getMsalInstance(): IPublicClientApplication {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
}
