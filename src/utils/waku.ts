'use client';

import {
  DecodedMessage,
  LightNode,
  createDecoder,
  createEncoder,
  createLightNode,
  waitForRemotePeer,
} from '@waku/sdk';
import protobuf from 'protobufjs';

const contentTopic = '/xyz/0';

export const PChatMessage = new protobuf.Type('ChatMessage')
  .add(new protobuf.Field('timestamp', 1, 'uint64'))
  .add(new protobuf.Field('message', 2, 'string'));

export interface IChatMessage {
  timestamp: Date;
  message: string;
}

const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

export const createNode = async () => {
  const waku = await createLightNode({ defaultBootstrap: true });
  await waitForRemotePeer(waku);
  return waku;
};

export const receiveMessages = async (
  waku: LightNode,
  callback: (chatMessage: IChatMessage) => void
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const pollMessageObj = PChatMessage.decode(wakuMessage.payload);
    const pollMessage = pollMessageObj.toJSON() as IChatMessage;
    callback(pollMessage);
  };

  const unsubscribe = await waku.filter.subscribe([decoder], _callback);
  return unsubscribe;
};

export const sendMessages = async (
  waku: LightNode,
  chatMessage: IChatMessage
) => {
  const protoMessage = PChatMessage.create({
    timestamp: chatMessage.timestamp,
    message: chatMessage.message,
  });

  // Serialise the message using Protobuf
  const serialisedMessage = PChatMessage.encode(protoMessage).finish();

  // Send the message using Light Push
  await waku.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};

export const retrieveExistingMessages = async (
  waku: LightNode,
  callback: (chatMessage: IChatMessage) => void
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const pollMessageObj = PChatMessage.decode(wakuMessage.payload);
    const pollMessage = pollMessageObj.toJSON() as IChatMessage;
    callback(pollMessage);
  };

  // Query the Store peer
  await waku.store.queryWithOrderedCallback([decoder], _callback);
};
