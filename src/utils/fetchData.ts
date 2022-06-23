export async function fetchData<T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  return await response.json();
}
