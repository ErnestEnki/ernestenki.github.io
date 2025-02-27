function generateTOC() {
  const contentElement = document.getElementsByTagName('main')[0];
  const tocElement = document.getElementById('toc-list');
  
  if (!contentElement || !tocElement) {
      console.error('Content or TOC container not found.');
      return;
  }

  const headers = contentElement.querySelectorAll('h1');
  const tocList = document.createDocumentFragment();

  headers.forEach(header => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');       

    anchor.href = `#${header.id}`;
    anchor.textContent = header.textContent;

    listItem.appendChild(anchor);

    if (header.tagName === 'H1') {
        // Create a new top-level item for H1
        currentH1Item = listItem;
        tocList.appendChild(listItem);
        currentH2Item = null; // Reset H2 context
    } else if (header.tagName === 'H2' && currentH1Item) {
        // Create a sub-list under the current H1 for H2
        let subList = currentH1Item.querySelector('ul');

        if (!subList) {
            subList = document.createElement('ul');
            currentH1Item.appendChild(subList);
        }

        currentH2Item = listItem;
        subList.appendChild(listItem);
    } else if (header.tagName === 'H3' && currentH2Item) {
        // Create a sub-list under the current H2 for H3
        let subList = currentH2Item.querySelector('ul');

        if (!subList) {
            subList = document.createElement('ul');
            currentH2Item.appendChild(subList);
        }

        subList.appendChild(listItem);
    }
  });

  tocElement.appendChild(tocList);
}

document.addEventListener("DOMContentLoaded", (event) => {
    generateTOC();
  });
