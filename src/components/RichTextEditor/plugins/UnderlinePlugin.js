import {MdFormatUnderlined} from 'react-icons/md';
import MarkPlugin from './MarkPlugin';

const mark = {
    u: {
        parseDOM: [{tag: 'u'}],
        toDOM: () => ['u', 0]
    }
};

export default MarkPlugin(MdFormatUnderlined, mark, 'u', 'u', 'Mod-u');
