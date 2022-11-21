import { InputNumeric } from '../../controls/InputNumeric/InputNumeric';
import { Panel } from '../../Panel/Panel';
import { PanelGridModel } from './PanelGrid.model';

export const PanelGrid = (props: PanelGridModel) => {
    const { grid, update } = props;
    const { blockSize, axisLength } = grid;
    return (
        <Panel title="Grid">
            <InputNumeric
                label="Block Size"
                value={blockSize}
                change={(value) => update({ blockSize: value })}
            />
            <InputNumeric
                label="Width"
                value={axisLength.X}
                change={(value) => update({ axisLength: { ...axisLength, X: value } })}
            />
            <InputNumeric
                label="Height"
                value={axisLength.Y}
                change={(value) => update({ axisLength: { ...axisLength, Y: value } })}
            />
            <InputNumeric
                label="Depth"
                value={axisLength.Z}
                change={(value) => update({ axisLength: { ...axisLength, Z: value } })}
            />
        </Panel>
    );
};
