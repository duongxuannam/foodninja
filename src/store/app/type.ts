export interface AppState {
  appVersion: string;
  isInit: boolean;
  isLoading: boolean;
  modal?: ModalState;
  toast?: ToastState;
  language: string;
  appearance?: AppearanceType;
  forceRender: number;
  onboard?: boolean;
}

export type AppearanceType = 'dark' | 'light' | undefined;

export interface ModalState {
  name: string;
  zIndex: number;
  data: object;
}

export interface ToastState {
  name: string;
  zIndex: number;
  data: object;
}
