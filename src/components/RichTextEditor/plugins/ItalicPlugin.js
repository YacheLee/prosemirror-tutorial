import {MdFormatItalic} from 'react-icons/md';
import MarkPlugin from './MarkPlugin';

const mark =  {
    em: {
        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
        toDOM: function toDOM() { return ["em", 0] }
    }
};

export default MarkPlugin(MdFormatItalic, mark, 'em', 'em', 'Mod-i');
