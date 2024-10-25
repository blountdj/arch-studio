export function textSplit(elem) {
    return new SplitType(elem, { types: "words, chars" })
}

export function removeScriptFromBody(srcUrl) {
    const bodyScripts = document.body.getElementsByTagName('script');
    for (let i = bodyScripts.length - 1; i >= 0; i--) {
      if (bodyScripts[i].src && bodyScripts[i].src.includes(srcUrl)) {
        bodyScripts[i].parentNode.removeChild(bodyScripts[i]);
      }
    }
}

export function addScriptToBody(srcUrl) {
    const script = document.createElement('script');
    script.src = srcUrl;
    document.body.appendChild(script);
}