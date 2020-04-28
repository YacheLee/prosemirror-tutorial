function markActive(state, type) {
    const {selection} = state;
    const {from, $from, to, empty} = selection;
    if (empty) {
        return type.isInSet(state.storedMarks || $from.marks());
    } else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

export function isActive(editorState, type) {
    return !!markActive(editorState, type);
}
