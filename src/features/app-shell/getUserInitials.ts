export function getUserInitials(userName: string) {
  return userName
    .split(" ")
    .map((part) => part.at(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
