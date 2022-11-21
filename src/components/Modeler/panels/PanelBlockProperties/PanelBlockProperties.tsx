import { Color } from '../../../../utils/color/color';
import { PointModel } from '../../../../utils/point/point.model';
import { InputNumeric } from '../../controls/InputNumeric/InputNumeric';
import { InputString } from '../../controls/InputString/InputString';
import { Label } from '../../controls/Label/Label';
import { Panel } from '../../Panel/Panel';
import { PanelBlockPropertiesModel } from './PanelBlockProperties.model';

export const PanelProperties = (props: PanelBlockPropertiesModel) => {
    const { block, grid, update } = props;
    const { id, name, background, border, point } = block;
    const color = new Color();
    return (
        <Panel title="Block Properties">
            <Label label="ID" value={id} />
            <InputString label="Name" value={name} change={(value) => update({ name: value })} />
            <InputString
                label="Background"
                value={color.parseColorType(background)}
                change={(value) => update({ background: value })}
            />
            <InputString
                label="Border"
                value={color.parseColorType(border)}
                change={(value) => update({ border: value })}
            />
            <InputNumeric
                label="X"
                min={0}
                max={grid.axisLength.X}
                value={point?.X}
                change={(value) => update({ point: { ...(point as PointModel), X: value } })}
            />
            <InputNumeric
                label="Y"
                min={0}
                max={grid.axisLength.Y}
                value={point?.Y}
                change={(value) => update({ point: { ...(point as PointModel), Y: value } })}
            />
            <InputNumeric
                label="Z"
                min={0}
                max={grid.axisLength.Z}
                value={point?.Z}
                change={(value) => update({ point: { ...(point as PointModel), Z: value } })}
            />
        </Panel>
    );
};
