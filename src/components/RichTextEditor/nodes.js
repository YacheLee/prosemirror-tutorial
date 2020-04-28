const nodes = {
    doc: {
        content: "paragraph+"
    },
    paragraph: {
        content: "inline*",
        group: "block",
        parseDOM: [{tag: "p"}],
        toDOM: function toDOM() {
            return ["p", 0]
        }
    },
    text: {
        group: "inline"
    },
};

export default nodes;
