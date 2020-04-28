import {history} from "prosemirror-history";
import UndoPlugin from "./plugins/UndoPlugin";
import RedoPlugin from "./plugins/RedoPlugin";
import BoldPlugin from "./plugins/BoldPlugin";
import ItalicPlugin from './plugins/ItalicPlugin';
import UnderlinePlugin from './plugins/UnderlinePlugin';
import StrikeThroughPlugin from './plugins/StrikeThroughPlugin';
import HeadingPlugin from './plugins/HeadingPlugin';

const plugins = [
    history(),
    UndoPlugin,
    RedoPlugin,
    HeadingPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikeThroughPlugin
];

export default plugins;
