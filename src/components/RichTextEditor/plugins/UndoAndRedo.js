import {redo, undo} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";

export default keymap({"Mod-z": undo, "Mod-y": redo});
