import {ColorPicker} from "../ColorPicker";
import {mountWithStore} from "../../tests/lib/mountWithStore";
import {SCORE_BACKGROUND_COLOR_ID} from "../../state/constants/colors";
import {getColorByColorID} from "../../state/readers/colors";
import {SketchPicker} from "react-color";

const defaultProps = {colorID: SCORE_BACKGROUND_COLOR_ID};

const setup = (props = defaultProps) => {
    const mountResults = mountWithStore(ColorPicker, {props: props});

    const compWrapperInner = () => {
        return mountResults.compWrapper().find("ColorPickerInner");
    };

    const defaultColor = getColorByColorID(
        mountResults.store.getState(), props.colorID);

    return { compWrapperInner, defaultColor, ...mountResults }
};

describe("components.ColorPicker", () => {
    test("color picker null when color is undefined", () => {
        const { compWrapperInner } = setup({colorID: "unknown-id"});

        const comp = compWrapperInner();
        expect(comp.children()).toHaveLength(0);
    });

    test("color is displayed in color-picker-button", () => {
        const { compWrapperInner, defaultColor } = setup();

        const comp = compWrapperInner();
        expect(comp.children()).toHaveLength(1);

        const button = comp.find(".color-picker-button");
        expect(button.props().style.backgroundColor).toEqual(defaultColor);
    });

    test("button clicked opens the SketchPicker", () => {
        const { compWrapperInner } = setup();

        const comp = compWrapperInner();
        expect(comp.children()).toHaveLength(1);
        expect(comp.find(SketchPicker)).toHaveLength(0);

        const button = comp.find(".color-picker-button");
        button.props().onClick();

        const comp2 = compWrapperInner();
        expect(comp2.children()).toHaveLength(2);
        expect(comp2.find(SketchPicker)).toHaveLength(1);
    });

    test("clicking outside of SketchPicker closes it", () => {
        const { compWrapperInner } = setup();

        const button = compWrapperInner().find(".color-picker-button");
        button.props().onClick();

        const comp2 = compWrapperInner();
        expect(comp2.children()).toHaveLength(2);
        expect(comp2.find(SketchPicker)).toHaveLength(1);

        comp2.find(".color-picker-cover").props().onClick();

        const comp3 = compWrapperInner();
        expect(comp3.children()).toHaveLength(1);
        expect(comp3.find(SketchPicker)).toHaveLength(0);
    });

    test("color change is registered", () => {
        const { store, compWrapperInner, defaultColor, props } = setup();

        const newColor = '#000';
        expect(defaultColor).not.toEqual(newColor);

        const button = compWrapperInner().find(".color-picker-button");
        button.props().onClick();

        const picker = compWrapperInner().find(SketchPicker);
        picker.props().onChange({hex: newColor});

        const color = getColorByColorID(store.getState(), props.colorID);
        expect(color).toEqual(newColor);
    });
});
