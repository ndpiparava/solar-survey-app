export const isValidString = (
  val?: unknown,
  allowEmpty = true,
  pattern?: RegExp,
): boolean => {
  if (val === undefined) return true;
  if (val === '' && allowEmpty) return true;
  if (typeof val !== 'string') return false;
  return pattern ? pattern.test(val) : true;
};
