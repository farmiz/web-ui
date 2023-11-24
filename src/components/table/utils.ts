const searchParams = new URLSearchParams(
  "columns=firstName%2ClastName%2Cgender%2Crole%2Cstatus&role_in="
);

function getValueFromParams(searchParams: Record<string, any>) {
  const paramNamePattern = /(\w+)_(eq|gt|gte|lt|lte|ne|in|nin|regex|exists)/i;
  for (const [paramName, paramValue] of searchParams.entries()) {
    const match = paramName.match(paramNamePattern);
    if (match) {
      return paramValue;
    }
  }
  return null;
}

const value = getValueFromParams(searchParams);
