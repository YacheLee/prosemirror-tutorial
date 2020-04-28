import {toggleMark} from 'prosemirror-commands';

const DEFAULT_COLOR = "black";

export function getColor(editorView) {
    const state = editorView.state;
    const { $from, $to, $cursor } = state.selection;
    const textColor = state.schema.marks.textColor;
    let marks = [];
    if ($cursor) {
        marks.push(
            textColor.isInSet(state.storedMarks || $cursor.marks()) || undefined
        );
    } else {
        state.doc.nodesBetween($from.pos, $to.pos, function (currentNode) {
            if (currentNode.isLeaf) {
                const mark = textColor.isInSet(currentNode.marks) || undefined;
                marks.push(mark);
                return !mark;
            }
            return true;
        });
    }
    let prevMark;
    marks = marks.filter(function (mark) {
        if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
            return false;
        }
        prevMark = mark;
        return true;
    });
    const marksWithColor = marks.filter(function (mark) {
        return !!mark;
    });
    if (
        marksWithColor.length > 1 ||
        (marksWithColor.length === 1 && marks.length > 1)
    ) {
        return DEFAULT_COLOR;
    }
    return marksWithColor.length ? marksWithColor[0].attrs.color : DEFAULT_COLOR;
}

function removeColor() {
    return (state, dispatch) => {
        let { schema, selection, tr } = state;
        const {textColor} = schema.marks;
        const { from, to, $cursor } = selection;
        if ($cursor) {
            tr = state.tr.removeStoredMark(textColor);
        } else {
            tr = state.tr.removeMark(from, to, textColor);
        }
        dispatch(tr.scrollIntoView());
        return true;
    };
}

export function toggleColor(editorView, color) {
    const type = editorView.state.schema.marks.textColor;
    const command = toggleMark(type, { color });
    command(editorView.state, editorView.dispatch);
}

export function changeColor(editorView, color, state, dispatch) {
    removeColor()(state, dispatch);
    toggleColor(editorView, color);
}
