export type Key = string[];

export type KeyBuilder<Options = any> = (options?: Options) => Key;

export enum KeyTypes {
  Local = "local",
  Remote = "remote",
}

export const fullKey = (type: KeyTypes, key: Key) => [type, ...key];

export const buildKey = <Options>(
  type: KeyTypes,
  keyOrBuilder: Key | KeyBuilder<Options>,
  options?: Options
) => {
  return fullKey(
    type,
    typeof keyOrBuilder === "function" ? keyOrBuilder(options) : keyOrBuilder
  );
};

export const localKey = <Options>(
  keyOrBuilder: Key | KeyBuilder<Options>,
  options?: Options
) => buildKey(KeyTypes.Local, keyOrBuilder, options);

export const remoteKey = <Options>(
  keyOrBuilder: Key | KeyBuilder<Options>,
  options?: Options
) => buildKey(KeyTypes.Remote, keyOrBuilder, options);
