import { OrderedSet } from 'immutable';

const SPACE = ' ';
const MAX_DEPTH = 4;

const getWhitespaceChunk = (inEntity: ?string): Object => {
  const entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return {
    text: SPACE,
    inlines: [new OrderedSet()],
    entities,
    blocks: [],
  };
};

const createTextChunk = (node: Object, inlineStyle: OrderedSet): Object => {
  const text = node.textContent;
  if (text.trim() === '') {
    return { chunk: getWhitespaceChunk() };
  }
  return {
    chunk: {
      text,
      inlines: Array(text.length).fill(inlineStyle),
      entities: Array(text.length).fill(null),
      blocks: [],
    },
  };
};

const getSoftNewlineChunk = (): Object => {
  return {
    text: '\n',
    inlines: [new OrderedSet()],
    entities: new Array(1),
    blocks: [],
  };
};

const getEmptyChunk = (): Object => {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: [],
  };
};

const getFirstBlockChunk = (blockType: string): Object => {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: 0,
    }],
  };
};

const getBlockDividerChunk = (blockType: string, depth: number): Object => {
  return {
    text: '\r',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth)),
    }],
  };
};

const joinChunks = (A: Object, B: Object): Object => {
  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks),
  };
}

module.exports = {
  createTextChunk,
  getWhitespaceChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
  getFirstBlockChunk,
  joinChunks,
};
