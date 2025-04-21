document.addEventListener("DOMContentLoaded", function () {
    let content = document.querySelector("#markdown-content");
    let tocContainers = document.querySelectorAll(".table-of-contents");

    if (!content || tocContainers.length === 0) return;

    let headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let tocList = document.createElement("ul");
    let numbering = [0, 0, 0, 0, 0, 0];

    headings.forEach(heading => {
        let level = parseInt(heading.tagName.substring(1)) - 1;
        for (let i = level + 1; i < numbering.length; i++) numbering[i] = 0;
        numbering[level]++;

        let num = numbering.slice(0, level + 1).join(".");
        let id = "toc-" + num.replace(/\./g, "-");
        heading.id = id;

        let tocItem = document.createElement("li");
        let tocLink = document.createElement("a");
        tocLink.classList.add("anchor-link");
        let tocNumber = document.createElement("span");

        tocNumber.classList.add("toc-number");
        tocNumber.textContent = num + ". ";
        tocLink.appendChild(tocNumber);
        tocLink.appendChild(document.createTextNode(heading.textContent));

        tocLink.href = "#" + id;
        tocItem.appendChild(tocLink);

        let parentList = tocList;
        for (let i = 0; i < level; i++) {
            if (!parentList.lastElementChild || !parentList.lastElementChild.querySelector("ul")) {
                let newList = document.createElement("ul");
                parentList.lastElementChild?.appendChild(newList);
            }
            parentList = parentList.lastElementChild.querySelector("ul");
        }
        parentList.appendChild(tocItem);
    });

    // tocContainer.appendChild(tocList);
    tocContainers.forEach(container => {
        container.appendChild(tocList.cloneNode(true));
    });
});
