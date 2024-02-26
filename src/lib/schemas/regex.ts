export const phoneRegex: RegExp = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])*$/,
);
export const plzRegex: RegExp = new RegExp(/^(\d{4})?$/);
export const numberRegex: RegExp = new RegExp(/^\d*$/);
export const dateRegex: RegExp = new RegExp(/^(?:\d{4}-\d{2}-\d{2})?$/);
