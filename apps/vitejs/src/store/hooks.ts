import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import type { AppDispatch, RootState } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
