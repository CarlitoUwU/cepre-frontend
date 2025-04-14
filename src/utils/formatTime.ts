export const formatTimeToHHMM = (isoString: string): string => {
  if (!isoString) {
    return "00:00"; // Default value if the input is empty
  }
  const date = new Date(isoString);
  return date.toISOString().substring(11, 16);
};