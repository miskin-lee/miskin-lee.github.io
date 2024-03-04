// <stdin>
var wrap = (figures) => {
  const galleryContainer = document.createElement("div");
  galleryContainer.className = "gallery";
  const parentNode = figures[0].parentNode, first = figures[0];
  parentNode.insertBefore(galleryContainer, first);
  for (const figure of figures) {
    galleryContainer.appendChild(figure);
  }
};
var stdin_default = (container) => {
  const images = container.querySelectorAll("img.gallery-image");
  for (const img of Array.from(images)) {
    const paragraph = img.closest("p");
    if (!paragraph || !container.contains(paragraph))
      continue;
    if (paragraph.textContent.trim() == "") {
      paragraph.classList.add("no-text");
    }
    let isNewLineImage = paragraph.classList.contains("no-text");
    if (!isNewLineImage)
      continue;
    const hasLink = img.parentElement.tagName == "A";
    let el = img;
    const figure = document.createElement("figure");
    figure.style.setProperty("flex-grow", img.getAttribute("data-flex-grow") || "1");
    figure.style.setProperty("flex-basis", img.getAttribute("data-flex-basis") || "0");
    if (hasLink) {
      el = img.parentElement;
    }
    el.parentElement.insertBefore(figure, el);
    figure.appendChild(el);
    if (img.hasAttribute("alt")) {
      const figcaption = document.createElement("figcaption");
      figcaption.innerText = img.getAttribute("alt");
      figure.appendChild(figcaption);
    }
    if (!hasLink) {
      figure.className = "gallery-image";
      const a = document.createElement("a");
      a.href = img.src;
      a.setAttribute("target", "_blank");
      a.setAttribute("data-pswp-width", img.width.toString());
      a.setAttribute("data-pswp-height", img.height.toString());
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    }
  }
  const figuresEl = container.querySelectorAll("figure.gallery-image");
  let currentGallery = [];
  for (const figure of Array.from(figuresEl)) {
    if (!currentGallery.length) {
      currentGallery = [figure];
    } else if (figure.previousElementSibling === currentGallery[currentGallery.length - 1]) {
      currentGallery.push(figure);
    } else if (currentGallery.length) {
      wrap(currentGallery);
      currentGallery = [figure];
    }
  }
  if (currentGallery.length > 0) {
    wrap(currentGallery);
  }
};
export {
  stdin_default as default
};
