import { transform } from "lodash";

export const currencyFormat = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function formatQueryParams(params?: Record<string, any>): string {
  let formattedQueryString: string = "";
  const query = new URLSearchParams(params as any);
  if (params && Object.keys(params).length) {
    formattedQueryString = `?${query}`;
  }
  return formattedQueryString;
}
export function objectToQueryString(obj: Record<string, any>) {
  const keys = obj ? Object.keys(obj) : [];
  const keyValuePairs = keys.map((key) => {
    const value = obj[key];

    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        // If the value is an array with elements, join them with ","
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(value.join(","))
        );
      } else if (
        (typeof value === "string" && value !== "") ||
        typeof value === "number"
      ) {
        // If the value is a non-empty string or a number, include it in the query string
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(value.toString())
        );
      }
    }

    return ""; // Skip keys with empty or undefined values
  });

  return keyValuePairs.filter((pair) => pair !== "").join("&");
}

export function cleanObject(obj: Record<string, any>) {
  return transform(
    obj,
    (result: Record<string, any>, value, key) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          // If it's a non-empty array, convert it to a comma-separated string
          result[key] = value.join(",");
        } else if (typeof value === "string" && value !== "") {
          // If it's a non-empty string, include it
          result[key] = value;
        } else if (typeof value === "number") {
          // If it's a number, include it
          result[key] = value;
        }
      }
    },
    {}
  );
}
