export type {
	InsforgeAuthClientLike,
	InsforgeProviderOptions,
	InsforgeUserLike,
} from "./insforge.provider.js";
export { useInsforgeAuthProvider } from "./insforge.provider.js";
export {
	defineInsforgeConfig,
	useGetInsforgeClient,
	useIfDelete,
	useIfDownload,
	useIfGetPublicUrl,
	useIfInsert,
	useIfInvokeFunction,
	useIfListObjects,
	useIfRemove,
	useIfRpc,
	useIfSelect,
	useIfUpdate,
	useIfUpload,
} from "./insforge.service.js";
export type {
	IfConfig,
	IfInsertRows,
	IfInvokeOptions,
	IfListOptions,
	IfOrder,
	IfRpcCall,
	IfStorageRef,
	IfTableQuery,
	IfUpdatePatch,
	IfWriteQuery,
} from "@/types/index.js";
