export function formatReleaseDate(released: string | null): string {
  if (!released) return "—";
  return new Date(released).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
