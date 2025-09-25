import 'react-intl';
import {TranslationKeys} from '.';

declare module 'react-intl' {
  export interface MessageDescriptor {
    id: TranslationKeys; // make `id` strictly typed
  }
}
