import { RpcActions } from "./rpc";
import { WalletActions } from "./wallet";

export type RootAction = WalletActions | RpcActions;
