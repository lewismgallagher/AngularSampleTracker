import { AlertEnum } from '../enums/alert.enum';

export interface Alert {
  type: AlertEnum;
  text: string;
  headerText?: string;
}
