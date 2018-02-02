import {AppDeveloper} from './app-developer';
import {AppVersion} from './app-version';
import {AppImage} from './app-image';

export interface AppPackage {
  id: string;
  name: string;
  description: string;
  appType: string;
  owner: string;
  developer: AppDeveloper;
  versions: AppVersion[];
  images: AppImage[];
}
