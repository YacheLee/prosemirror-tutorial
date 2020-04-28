import {MdFormatStrikethrough} from 'react-icons/md';
import MarkPlugin from './MarkPlugin';

const mark = {
    del: {
        parseDOM: [{tag: 'del'}],
        toDOM: () => ['del', 0]
    }
};

export default MarkPlugin(MdFormatStrikethrough, mark, 'del', 'del');
