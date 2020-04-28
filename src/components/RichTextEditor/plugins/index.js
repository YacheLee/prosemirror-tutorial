import {history} from "prosemirror-history";
import {keymap} from 'prosemirror-keymap';
import {baseKeymap} from 'prosemirror-commands';
import UndoPlugin from "./UndoPlugin";
import RedoPlugin from "./RedoPlugin";
import BoldPlugin from "./BoldPlugin";
import ItalicPlugin from './ItalicPlugin';
import UnderlinePlugin from './UnderlinePlugin';
import StrikeThroughPlugin from './StrikeThroughPlugin';
import HeadingPlugin from './HeadingPlugin';
import TextColorPlugin from './TextColorPlugin';

const plugins = [
    history(),
    keymap(baseKeymap),
    UndoPlugin,
    RedoPlugin,
    HeadingPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikeThroughPlugin,
    TextColorPlugin
];

export default plugins;
