
type BASE_TYPEDEFINE = {
    "string": string,
    "bool": boolean,
    "bytes": Uint8Array,
    "int32": number,
    "float": number
  }
  type BASE_PBTYPE = {
    rule?: string,
    type: string,
    id: number
  }
  type BASE_PBROOT = {
    nested?: {
      [key: string]: BASE_PBROOT
    },
    fields?: {
      [key: string]: BASE_PBTYPE
    }
  }


type PICK_ROOT<R, T extends keyof BASE_PBROOT> = R extends BASE_PBROOT ? R[T] : never
/**摘出 nested*/
type PICK_NAMESPACE<R> = PICK_ROOT<R, "nested">
/**摘出 fields*/
type PICK_FIELDS<R> = PICK_ROOT<R, "fields">
/**摘出 nested.T*/
type PICK_FIELDS_TYPE_OBJECT_DEFINE<T extends string, R extends BASE_PBROOT["nested"]> = T extends keyof R ? R[T] : never;
/**摘出 fields.T*/
// type GETFIELDSTYPEDEFINE<T extends string, R extends PBROOT["fields"]> = T extends keyof R ? R[T] : never;
type STATIC_TYPEDEFINE_FIELDS<T extends BASE_PBROOT["fields"], R extends BASE_PBROOT["nested"]> = {
  [key in keyof T]: T[key] extends BASE_PBTYPE ? STATIC_TYPEDEFINE_FIELD<T[key], R> : never
};
type STATIC_TYPEDEFINE_FIELD<T extends BASE_PBTYPE, R extends BASE_PBROOT["nested"]> = T["rule"] extends "repeated" ?
  Array<STATIC_TYPEDEFINE_FIELD<Omit<T, "rule">, R>>
  : T["type"] extends keyof BASE_TYPEDEFINE ? BASE_TYPEDEFINE[T["type"]]
  : T["type"] extends keyof R ? R[T["type"]] extends BASE_PBROOT ? STATIC_TYPEDEFINE_FIELDS<PICK_FIELDS<R[T["type"]]>, R>
  : never
  : never;
type ROUTER_BODY<T extends string, ROOT extends BASE_PBROOT> = STATIC_TYPEDEFINE_FIELDS<
  PICK_FIELDS<PICK_FIELDS_TYPE_OBJECT_DEFINE<"body", PICK_NAMESPACE<PICK_FIELDS_TYPE_OBJECT_DEFINE<T, PICK_NAMESPACE<ROOT>>>>>,
  PICK_NAMESPACE<PICK_FIELDS_TYPE_OBJECT_DEFINE<T, PICK_NAMESPACE<ROOT>>>
>
type ROUTER_PAYLOAD<T extends string, ROOT extends BASE_PBROOT> = STATIC_TYPEDEFINE_FIELDS<
  PICK_FIELDS<PICK_FIELDS_TYPE_OBJECT_DEFINE<"response", PICK_NAMESPACE<PICK_FIELDS_TYPE_OBJECT_DEFINE<T, PICK_NAMESPACE<ROOT>>>>>,
  PICK_NAMESPACE<PICK_FIELDS_TYPE_OBJECT_DEFINE<T, PICK_NAMESPACE<ROOT>>>
>
type PB_RAW_ROOT =
/*____PBJSON____*/
{"nested":{"_user_capthcha":{"fields":{},"nested":{"body":{"fields":{"email":{"type":"string","id":1},"nickname":{"type":"string","id":2}}},"response":{"fields":{}}}},"_friendURL":{"fields":{},"nested":{"urls":{"fields":{"url":{"type":"string","id":1},"title":{"type":"string","id":2}}},"body":{"fields":{}},"response":{"fields":{"urls":{"rule":"repeated","type":"urls","id":1}}}}},"_user_login":{"fields":{},"nested":{"body":{"fields":{"mail":{"type":"string","id":1}}},"response":{"fields":{}}}},"_user_register":{"fields":{},"nested":{"body":{"fields":{"mail":{"type":"string","id":1},"nickname":{"type":"string","id":2},"capthcha":{"type":"string","id":3}}},"response":{"fields":{}}}},"_file_uploadImage":{"fields":{},"nested":{"body":{"fields":{"file":{"type":"bytes","id":1}}},"response":{"fields":{"fileURL":{"type":"string","id":1}}}}},"__Response":{"fields":{"result":{"type":"bool","id":1},"data":{"type":"bytes","id":2},"message":{"type":"string","id":3},"code":{"type":"int32","id":4}}}}}
/*____PBJSON____*/
type URL_DEFINE<T> = keyof Omit< PICK_NAMESPACE<T>,"__Response">
//啊


export {
    ROUTER_BODY,
    URL_DEFINE,
    ROUTER_PAYLOAD
}
// type z = URL_DEFINE<{"nested":{"_user_capthcha":{"fields":{},"nested":{"body":{"fields":{"email":{"type":"string","id":1},"nickname":{"type":"string","id":2}}},"response":{"fields":{}}}},"_friendURL":{"fields":{},"nested":{"urls":{"fields":{"url":{"type":"string","id":1},"title":{"type":"string","id":2}}},"body":{"fields":{}},"response":{"fields":{"urls":{"rule":"repeated","type":"urls","id":1}}}}},"_user_login":{"fields":{},"nested":{"body":{"fields":{"mail":{"type":"string","id":1}}},"response":{"fields":{}}}},"_user_register":{"fields":{},"nested":{"body":{"fields":{"mail":{"type":"string","id":1},"nickname":{"type":"string","id":2},"capthcha":{"type":"string","id":3}}},"response":{"fields":{}}}},"_file_uploadImage":{"fields":{},"nested":{"body":{"fields":{"file":{"type":"bytes","id":1}}},"response":{"fields":{"fileURL":{"type":"string","id":1}}}}},"__Response":{"fields":{"result":{"type":"bool","id":1},"data":{"type":"bytes","id":2},"message":{"type":"string","id":3},"code":{"type":"int32","id":4}}}}}>