import { EventEmitter } from 'eventemitter3';
import type { Except, Merge, SetOptional } from 'type-fest';
import { WebSocketOpCode } from './types.js';
import type { OutgoingMessageTypes, OutgoingMessage, OBSEventTypes, IncomingMessage, IncomingMessageTypes, OBSRequestTypes, OBSResponseTypes, RequestBatchRequest, ResponseMessage, RequestBatchOptions } from './types.js';
export declare class OBSWebSocketError extends Error {
    code: number;
    constructor(code: number, message: string);
}
export type EventTypes = Merge<{
    ConnectionOpened: void;
    ConnectionClosed: OBSWebSocketError;
    ConnectionError: OBSWebSocketError;
    Hello: IncomingMessageTypes[WebSocketOpCode.Hello];
    Identified: IncomingMessageTypes[WebSocketOpCode.Identified];
}, OBSEventTypes>;
type MapValueToArgsArray<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K] extends void ? [] : [T[K]];
};
type IdentificationInput = SetOptional<Except<OutgoingMessageTypes[WebSocketOpCode.Identify], 'authentication'>, 'rpcVersion'>;
type HelloIdentifiedMerged = Merge<Exclude<IncomingMessageTypes[WebSocketOpCode.Hello], 'authenticate'>, IncomingMessageTypes[WebSocketOpCode.Identified]>;
export declare abstract class BaseOBSWebSocket extends EventEmitter<MapValueToArgsArray<EventTypes>> {
    protected static requestCounter: number;
    protected static generateMessageId(): string;
    protected _identified: boolean;
    protected internalListeners: EventEmitter<string | symbol, any>;
    protected socket?: WebSocket;
    protected abstract protocol: string;
    get identified(): boolean;
    /**
     * Connect to an obs-websocket server
     * @param url Websocket server to connect to (including ws:// or wss:// protocol)
     * @param password Password
     * @param identificationParams Data for Identify event
     * @returns Hello & Identified messages data (combined)
     */
    connect(url?: string, password?: string, identificationParams?: IdentificationInput): Promise<HelloIdentifiedMerged>;
    /**
     * Disconnect from obs-websocket server
     */
    disconnect(): Promise<void>;
    /**
     * Update session parameters
     * @param data Reidentify data
     * @returns Identified message data
     */
    reidentify(data: OutgoingMessageTypes[WebSocketOpCode.Reidentify]): Promise<{
        negotiatedRpcVersion: number;
    }>;
    /**
     * Send a request to obs-websocket
     * @param requestType Request name
     * @param requestData Request data
     * @returns Request response
     */
    call<Type extends keyof OBSRequestTypes>(requestType: Type, requestData?: OBSRequestTypes[Type]): Promise<OBSResponseTypes[Type]>;
    /**
     * Send a batch request to obs-websocket
     * @param requests Array of Request objects (type and data)
     * @param options A set of options for how the batch will be executed
     * @param options.executionType The mode of execution obs-websocket will run the batch in
     * @param options.haltOnFailure Whether obs-websocket should stop executing the batch if one request fails
     * @returns RequestBatch response
     */
    callBatch(requests: RequestBatchRequest[], options?: RequestBatchOptions): Promise<ResponseMessage[]>;
    /**
     * Cleanup from socket disconnection
     */
    protected cleanup(): void;
    /**
     * Create connection to specified obs-websocket server
     *
     * @private
     * @param url Websocket address
     * @returns Promise for hello data
     */
    protected createConnection(url: string): Promise<{
        obsWebSocketVersion: string;
        rpcVersion: number;
        authentication?: {
            challenge: string;
            salt: string;
        } | undefined;
    }>;
    /**
     * Send identify message
     *
     * @private
     * @param hello Hello message data
     * @param password Password
     * @param identificationParams Identification params
     * @returns Hello & Identified messages data (combined)
     */
    protected identify({ authentication, rpcVersion, ...helloRest }: IncomingMessageTypes[WebSocketOpCode.Hello], password?: string, identificationParams?: IdentificationInput): Promise<HelloIdentifiedMerged>;
    /**
     * Send message to obs-websocket
     *
     * @private
     * @param op WebSocketOpCode
     * @param d Message data
     */
    protected message<Type extends keyof OutgoingMessageTypes>(op: Type, d: OutgoingMessageTypes[Type]): Promise<void>;
    /**
     * Create a promise to listen for an event on internal listener
     * (will be cleaned up on disconnect)
     *
     * @private
     * @param event Event to listen to
     * @returns Event data
     */
    protected internalEventPromise<ReturnVal = unknown>(event: string): Promise<ReturnVal>;
    /**
     * Websocket open event listener
     *
     * @private
     * @param e Event
     */
    protected onOpen(e: Event): void;
    /**
     * Websocket message event listener
     *
     * @private
     * @param e Event
     */
    protected onMessage(e: MessageEvent<string | Blob | ArrayBuffer>): Promise<void>;
    /**
     * Websocket error event listener
     *
     * @private
     * @param e ErrorEvent
     */
    protected onError(e: ErrorEvent): void;
    /**
     * Websocket close event listener
     *
     * @private
     * @param e Event
     */
    protected onClose(e: CloseEvent): void;
    /**
     * Encode a message for specified protocol
     * @param data Outgoing message
     * @returns Outgoing message to send via websocket
     */
    protected abstract encodeMessage(data: OutgoingMessage): Promise<string | Blob | ArrayBufferView>;
    /**
     * Decode a message for specified protocol
     * @param data Incoming message from websocket
     * @returns Parsed incoming message
     */
    protected abstract decodeMessage(data: string | ArrayBuffer | Blob): Promise<IncomingMessage>;
}
export {};