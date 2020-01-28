export const Html = {
  rawHtmlToNodes: ({ raw }: { raw: string }): any => {
    const temp = document.createElement('div');
    temp.innerHTML = raw;
    if (temp.hasChildNodes()) {
      return temp.childNodes;
    } else {
      return temp.firstChild;
    }
  }
};

export default Html;
