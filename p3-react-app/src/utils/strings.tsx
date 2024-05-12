const clipCourseDescription = (description: string, maxLength: number) => {
  if (description.length <= maxLength) return description;

  let end = maxLength;
  while (end > 0 && description[end] !== ' ') {
    end--;
  }

  let clippedDescription = description.slice(0, end);
  clippedDescription = clippedDescription.replace(/[.,;:!?'"]+$/, '');

  return `${clippedDescription}...`;
};

export { clipCourseDescription };
