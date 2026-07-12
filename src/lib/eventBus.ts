type Events = {
  'session:expired': undefined;
};

type Listener<K extends keyof Events> = (payload: Events[K]) => void;

const listeners = new Map<keyof Events, Set<Listener<never>>>();

export const eventBus = {
  on<K extends keyof Events>(event: K, listener: Listener<K>) {
    const set = listeners.get(event) ?? new Set();
    set.add(listener as Listener<never>);
    listeners.set(event, set);
    return () => {
      set.delete(listener as Listener<never>);
    };
  },
  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    listeners.get(event)?.forEach((listener) => listener(payload as never));
  },
};
