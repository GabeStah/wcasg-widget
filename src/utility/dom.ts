const textFieldTags = ['textarea', 'input'];

export const Dom = {
  getFocusedNode: () => document.activeElement,
  isFocusedNodeInputField: ():
    | HTMLTextAreaElement
    | HTMLInputElement
    | undefined => {
    const activeElement = document.activeElement;
    if (
      activeElement &&
      textFieldTags.includes(activeElement.tagName.toLowerCase())
    ) {
      // @ts-ignore
      return activeElement;
    }
  },
  /**
   * Constructs new element text value based on current value.
   * Inserts new value text into location of cursor, if applicable.
   * If element has active selection text, value inserted in place of selection.
   *
   * @param {HTMLTextAreaElement | HTMLInputElement} element
   * @param {string | undefined} value
   * @returns {string}
   */
  insertTextIntoInputElement: ({
    element,
    value
  }: {
    element: HTMLTextAreaElement | HTMLInputElement;
    value: string | undefined;
  }): string => {
    if (!element || !value) {
      return '';
    }
    const currentValue = element.value;
    const selectionStart = element.selectionStart;
    const selectionEnd = element.selectionEnd;
    const prefixChunk = currentValue.substring(
      0,
      selectionStart ? selectionStart : 0
    );
    const suffixChunk = currentValue.substring(
      selectionEnd ? selectionEnd : currentValue.length
    );
    const newValue = prefixChunk.concat(value ? value : '', suffixChunk);
    element.value = newValue;
    // Insert selection at end of inserted text;
    element.setSelectionRange(
      prefixChunk.length + value.length,
      prefixChunk.length + value.length
    );
    return newValue;
  },
  /**
   * Emulates 'Backspace' key press for passed input element.
   *
   * @param {HTMLTextAreaElement | HTMLInputElement} element
   * @returns {string}
   */
  simulateBackspaceInInputElement: (
    element: HTMLTextAreaElement | HTMLInputElement
  ): string => {
    if (!element) {
      return '';
    }
    const currentValue = element.value;
    const selectionStart = element.selectionStart ? element.selectionStart : 0;
    const selectionEnd = element.selectionEnd ? element.selectionEnd : 0;

    // Concat prefix + suffix
    const prefixChunk = currentValue.substring(0, selectionStart); // Correct
    const suffixChunk = currentValue.substring(selectionEnd); // Correct
    let newValue = prefixChunk.concat(suffixChunk);
    // If start / end are same, remove first char of suffix
    if (selectionStart === selectionEnd) {
      newValue = prefixChunk.slice(0, selectionStart - 1).concat(suffixChunk);
    }
    element.value = newValue;

    if (selectionStart === selectionEnd) {
      element.setSelectionRange(selectionStart - 1, selectionStart - 1);
    } else {
      element.setSelectionRange(selectionStart, selectionStart);
    }
    return newValue;
  },
  /**
   * Emulates 'Delete' key press for passed input element.
   *
   * @param {HTMLTextAreaElement | HTMLInputElement} element
   * @returns {string}
   */
  simulateDeleteInInputElement: (
    element: HTMLTextAreaElement | HTMLInputElement
  ): string => {
    if (!element) {
      return '';
    }
    const currentValue = element.value;
    const selectionStart = element.selectionStart ? element.selectionStart : 0;
    const selectionEnd = element.selectionEnd ? element.selectionEnd : 0;

    // Concat prefix + suffix
    const prefixChunk = currentValue.substring(0, selectionStart); // Correct
    const suffixChunk = currentValue.substring(selectionEnd); // Correct
    let newValue = prefixChunk.concat(suffixChunk);
    // If start / end are same, remove first char of suffix
    if (selectionStart === selectionEnd) {
      newValue = prefixChunk.concat(suffixChunk.slice(1));
    }
    element.value = newValue;
    // Insert selection at end of inserted text;
    element.setSelectionRange(selectionStart, selectionStart);
    return newValue;
  },
  simulateTabInInputElement: (
    element: HTMLTextAreaElement | HTMLInputElement
  ): void => {}
};

export default Dom;
