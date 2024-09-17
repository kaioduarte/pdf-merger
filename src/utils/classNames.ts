export function classNames(
  ...classes: Array<string | undefined | null | boolean>
) {
  return classes.filter(Boolean).join(" ");
}
