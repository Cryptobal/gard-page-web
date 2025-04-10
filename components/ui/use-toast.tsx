import { useState, useEffect, createContext, useContext } from "react";

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function generateId() {
  return `${count++}`;
}

// Acciones del reducer
type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // Dismiss all toasts
      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      // Dismiss specific toast
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST: {
      const { toastId } = action;

      // Remove all toasts
      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      // Remove specific toast
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }

    default:
      return state;
  }
};

// Versión simplificada del dispatch personalizado
const useToastReducer = (initialState: State) => {
  const [state, setState] = useState<State>(initialState);

  const dispatch = (action: Action) => {
    const newState = toastReducer(state, action);
    setState(newState);
  };

  return [state, dispatch] as const;
};

type Toast = Omit<ToasterToast, "id">;

// Contexto para el sistema de toast
const ToastContext = createContext<{
  toasts: ToasterToast[];
  toast: (props: Toast) => void;
  dismiss: (toastId?: string) => void;
  remove: (toastId?: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({
    toasts: [],
  });

  // Función para despachar acciones
  const dispatch = (action: Action) => {
    const newState = toastReducer(state, action);
    setState(newState);
  };

  // Añadir nuevo toast
  const toast = ({ ...props }: Toast) => {
    const id = generateId();
    
    const newToast = {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) {
          dismiss(id);
        }
      },
    };

    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: newToast,
    });

    return id;
  };

  // Descartar toast (cerrarlo)
  const dismiss = (toastId?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  };

  // Eliminar toast
  const remove = (toastId?: string) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  };

  // Limpiar toasts descartados después de la animación
  useEffect(() => {
    const handleRemoveToast = () => {
      state.toasts.forEach((toast) => {
        if (!toast.open) {
          setTimeout(() => {
            remove(toast.id);
          }, TOAST_REMOVE_DELAY);
        }
      });
    };

    handleRemoveToast();
  }, [state.toasts]);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast, dismiss, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook para usar el sistema de toast
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }

  return context;
}; 