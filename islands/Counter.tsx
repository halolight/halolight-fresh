import { useSignal } from "@preact/signals";

interface CounterProps {
  start: number;
}

export default function Counter({ start }: CounterProps) {
  const count = useSignal(start);

  return (
    <div class="flex items-center justify-center gap-4">
      <button
        class="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full text-xl font-bold transition"
        onClick={() => count.value--}
      >
        -
      </button>
      <span class="text-2xl font-bold text-gray-900 dark:text-white min-w-[3ch] text-center">
        {count}
      </span>
      <button
        class="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl font-bold transition"
        onClick={() => count.value++}
      >
        +
      </button>
    </div>
  );
}
