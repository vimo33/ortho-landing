/** Setzt **fett** markierte Stellen als <strong>. */
export function Rich({ children }: { children: string }) {
  return <>{children.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}
