export interface Option {
    label: string;
    value: any;
}

export type ActionType = 'dialog' | 'drawer' | 'cancel' | 'confirm' | 'reset' | 'submit';

export type ActionLevel = '' | 'default' | 'primary' | 'warning' | 'info'

export interface Action {
    type: 'reset' | 'button' | 'submit' | 'action';
    label?: string;
    level?: ActionLevel;
    actionType?: ActionType;
    url?: string;
    onClick?: (...args: any[]) => void;
    onClose?: (...args: any[]) => void;
}
