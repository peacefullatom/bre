import { useState } from 'react';
import { Color } from '../../../utils/color/color';
import { PanelModel } from './Panel.model';

export const Panel = (props: PanelModel) => {
    const {
        title,
        collapsed: collapsedSettings,
        children,
        color: colorSettings,
    } = props;
    const [collapsed, setCollapsed] = useState<boolean>(
        collapsedSettings || true
    );
    const color = new Color();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    height: '2rem',
                    lineHeight: '2rem',
                    padding: '0 2rem',
                    cursor: 'pointer',
                    background: color.parseColorType(
                        colorSettings || '#b0b0b0'
                    ),
                    justifyContent: 'space-between',
                }}
                onClick={() => setCollapsed(!collapsed)}
                title={title}
            >
                <div
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        width: '2rem',
                        textAlign: 'center',
                        flexShrink: 0,
                    }}
                >
                    {collapsed ? '+' : '-'}
                </div>
            </div>
            {!collapsed && (
                <div
                    style={{
                        marginBottom: '2rem',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
