import {mountWithStore} from "../../tests/lib/mountWithStore";
import {MainLayout} from "../MainLayout";
import {ScoreDisplay} from "../ScoreDisplay";
import {ScoreChangeButtonBar} from "../ScoreChangeButtonBar";
import {ScoreColorPickers} from "../ScoreColorPickers";

const setup = () => {
    return mountWithStore(MainLayout);
};

describe("components.MainLayout", () => {
    test("renders all the relevant elements", () => {
        const { compWrapper } = setup();

        const comp = compWrapper();
        expect(comp.find(ScoreDisplay)).toHaveLength(1);
        expect(comp.find(ScoreChangeButtonBar)).toHaveLength(1);
        expect(comp.find(ScoreColorPickers)).toHaveLength(1);
    });
});
