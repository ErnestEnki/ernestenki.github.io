let readerExpModal = `<div class="modal fade" id="readerExpModal" tabindex="-1" aria-labelledby="readerExpModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Customize Reader Experience</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="font-family">Font:</label>
              <select id="font-family">
                  <option value="Arial" style="font-family: Arial;">Arial</option>
                  <option value="Verdana" style="font-family: Verdana;">Verdana</option>
                  <option value="Calibri" style="font-family: Calibri;">Calibri</option>
                  <option value="Times New Roman" style="font-family: Times New Roman;">Times New Roman</option>
                  <option value="Merriweather" style="font-family: Merriweather;">Merriweather</option>
                  <option value="Georgia" style="font-family: Georgia;">Georgia</option>
                  <option value="Open-Dyslexic" style="font-family: Open-Dyslexic;">Open Dyslexic</option>
                  <option value="Libre Baskerville" style="font-family: Libre Baskerville;">Libre Baskerville</option>
              </select>
              <br/>
          
              <label for="font-size">Text size:</label>
              <input type="number" id="font-size" value="18" min="12" max="32" />
              <br/>
          
              <label for="color">Text color:</label>
              <input type="color" id="text-color" value="#000000" />
              <br/>

              <label for="color">Background color:</label>
              <input type="color" id="background-color" value="#FFFFFF" />
            </div>
          </div>
        </div>
      </div>`;

document.write(readerExpModal);

const contentStyle = document.getElementsByTagName('main')[0].style;
      
document.getElementById('font-family').addEventListener('change', (e) => {
  contentStyle.fontFamily = e.target.value;
});

document.getElementById('font-size').addEventListener('input', (e) => {
  contentStyle.fontSize = e.target.value + 'px';
});

document.getElementById('text-color').addEventListener('input', (e) => {
  contentStyle.color = e.target.value;
});

document.getElementById('background-color').addEventListener('input', (e) => {
  contentStyle.backgroundColor = e.target.value;
});   

document.getElementById('currentUrl').innerHTML = window.location.origin;


var linksInHeadings = new AnchorJS({ placement: 'right', visible: 'always', });
linksInHeadings.add('main h1, main h2, main h3');


function generateTOC() {
  const contentElement = document.getElementsByTagName('main')[0];
  const tocElement = document.getElementById('toc-list');
  
  if (!contentElement || !tocElement) {
      console.error('Content or TOC container not found.');
      return;
  }

  const headers = contentElement.querySelectorAll('h1, h2, h3');
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

generateTOC();