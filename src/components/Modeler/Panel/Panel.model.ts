import { ReactNode } from 'react';
import { ColorType } from '../../../utils/color/color.model';

export interface PanelModel {
    title: string;
    collapsed?: boolean;
    children: ReactNode;
    color?: ColorType;
}
