import { cockroach } from "@cockroachlabs/crdb-protobuf-client";

interface ResponseBuilder<P, R> {
  new (properties?: P): R;
  encode(message: P, writer?: protobuf.Writer): protobuf.Writer;
  decode(reader: protobuf.Reader | Uint8Array, length?: number): R;
}

export const fetchData = <Props, Resp, T extends ResponseBuilder<Props, Resp>>(
  builder: T,
  path: string,
  data?: any,
): Promise<Resp> => {
  const params: RequestInit = {
    headers: {
      Accept: "application/x-protobuf",
      "Content-Type": "application/x-protobuf",
      "Grpc-Timeout": "30000m",
    },
    credentials: "same-origin",
  };
  return fetch(path, params)
    .then(response => {
      if (!response.ok) {
        throw new cockroach.server.serverpb.ResponseError({
          error: response.statusText,
        });
      }
      return response.arrayBuffer();
    })
    .then(buffer => builder.decode(new Uint8Array(buffer)))
    .catch(error => {
      throw new cockroach.server.serverpb.ResponseError({ error });
    });
};
