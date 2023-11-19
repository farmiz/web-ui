import { UploadedFileProps } from "@/interfaces";
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

export function objectDifference(
  baseObject: Record<string, any>,
  objectToCompare: Record<string, any>
) {
  const diff: Record<string, any> = {};

  // Check keys in baseObject
  for (const key in baseObject) {
    if (baseObject.hasOwnProperty(key)) {
      if (
        typeof baseObject[key] === "object" &&
        objectToCompare.hasOwnProperty(key) &&
        typeof objectToCompare[key] === "object"
      ) {
        // Recursively compare nested objects
        const nestedDiff = objectDifference(
          baseObject[key],
          objectToCompare[key]
        );
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (
        !objectToCompare.hasOwnProperty(key) ||
        baseObject[key] !== objectToCompare[key]
      ) {
        // If key is not present in objectToCompare or values are different, add to diff
        diff[key] = baseObject[key];
      }
    }
  }

  // Check keys in objectToCompare
  for (const key in objectToCompare) {
    if (
      objectToCompare.hasOwnProperty(key) &&
      !baseObject.hasOwnProperty(key)
    ) {
      // If key is present in objectToCompare but not in baseObject, add to diff
      diff[key] = objectToCompare[key];
    }
  }

  return diff;
}

type SizeUnit = "B" | "KB" | "MB" | "GB" | "TB";

const sizeMap: Record<SizeUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};

export function formatFileSize(sizeInBytes: number): string {
  for (const unit of ["B", "KB", "MB", "GB", "TB"] as SizeUnit[]) {
    if (sizeInBytes < sizeMap[unit]) {
      return `${(sizeInBytes / sizeMap[unit]).toFixed(2)} ${unit}`;
    }
  }
  return `${sizeInBytes} B`;
}

export function combineWithOr(strings: string[]) {
  if (strings.length === 0) {
    return "";
  } else if (strings.length === 1) {
    return strings[0];
  } else {
    const lastString = strings.pop();
    return `${strings.join(", ")} or ${lastString}`;
  }
}

export function validateFile(uploadedFile: UploadedFileProps) {
  return !!(uploadedFile.fileURL && Object.keys(uploadedFile).length);
}
