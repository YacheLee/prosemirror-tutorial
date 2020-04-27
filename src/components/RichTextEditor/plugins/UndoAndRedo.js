import {redo, undo} from "prosemirror-history";
import {keydownHandler} from "prosemirror-keymap";
import {Plugin} from 'prosemirror-state';

export default new Plugin({
    props: {
        handleKeyDown: keydownHandler({
            "Mod-z": undo,
            "Mod-y": redo
        })
    }
});
