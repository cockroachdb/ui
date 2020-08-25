import { cockroach } from "@cockroachlabs/crdb-protobuf-client";

interface ProtoBuilder<
  P extends ConstructorType,
  Prop = FirstConstructorParameter<P>,
  R = InstanceType<P>
> {
  new (properties?: Prop): R;
  encode(message: Prop, writer?: protobuf.Writer): protobuf.Writer;
  decode(reader: protobuf.Reader | Uint8Array, length?: number): R;
}

export function toArrayBuffer(encodedRequest: Uint8Array): ArrayBuffer {
  return encodedRequest.buffer.slice(
    encodedRequest.byteOffset,
    encodedRequest.byteOffset + encodedRequest.byteLength,
  );
}

/**
 * @param RespBuilder expects protobuf stub class to build decode response;
 * @param path relative URL path for requested resource;
 * @param ReqBuilder expects protobuf stub to encode request payload. It has to be
 * class type, not instance;
 * @param reqPayload is request payload object;
 **/
export const fetchData = <P extends ProtoBuilder<P>, T extends ProtoBuilder<T>>(
  RespBuilder: T,
  path: string,
  ReqBuilder?: P,
  reqPayload?: FirstConstructorParameter<P>,
): Promise<InstanceType<T>> => {
  const params: RequestInit = {
    headers: {
      Accept: "application/x-protobuf",
      "Content-Type": "application/x-protobuf",
      "Grpc-Timeout": "30000m",
    },
    credentials: "same-origin",
  };

  if (reqPayload) {
    const encodedRequest = ReqBuilder.encode(reqPayload).finish();
    params.method = "POST";
    params.body = toArrayBuffer(encodedRequest);
  }

  return fetch(path, params)
    .then(response => {
      if (!response.ok) {
        throw new cockroach.server.serverpb.ResponseError({
          error: response.statusText,
        });
      }
      return response.arrayBuffer();
    })
    .then(buffer => RespBuilder.decode(new Uint8Array(buffer)))
    .catch(error => {
      throw new cockroach.server.serverpb.ResponseError({ error });
    });
};
