const adjustFontSize = () => {
  // Check for body
  const body = document.body;
  // TODO: Handle case for invalid HTML document
  if (!body) return;
  // Get base computed font size
  const computedFontSize = window
    .getComputedStyle(body)
    .getPropertyValue('font-size');

  // Find base size
  // body { }
  //
  // h1
  //
  // Adjust all fonts by %
};
