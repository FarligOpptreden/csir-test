export default function classNameBuilder(...classes: string[]): string {
  if (!classes?.length) return "";

  let className = "";

  for (let i in classes) {
    if (!classes[i]) continue;

    className += (className ? " " : "") + classes[i];
  }

  return className;
}
