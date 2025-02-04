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
  document.documentElement.style.setProperty('--text-color', e.target.value);
});

document.getElementById('background-color').addEventListener('input', (e) => {
  document.body.style.backgroundColor = e.target.value;
});

var linksInHeadings = new AnchorJS({ placement: 'right', visible: 'always', });
linksInHeadings.add('main h1, main h2, main h3');


document.getElementById('currentUrl').innerHTML = window.location.origin;


const definitions = {};
document.querySelectorAll('.key-concepts li').forEach(li => {
  const text = li.textContent.trim();
  // Split once at ':'
  const parts = text.split(':');
  if (parts.length >= 2) {
    const term = parts[0].trim();
    const definition = parts.slice(1).join(':').trim();
    if (term && definition) {
      definitions[term] = definition;
    }
  }
});

// 2. For each key term, find all occurrences in <main> and wrap them with a tooltip span
const mainEl = document.querySelector('main');
let mainHTML = mainEl.innerHTML;

for (const term in definitions) {
  // Escape special regex characters in the term
  const escapedTerm = term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  // Create a global regex to find all matches (case-insensitive)
  const pattern = new RegExp(`\\b(${escapedTerm})\\b`, 'g');

  // Replace matches with a span that carries Bootstrap's tooltip attributes
  // Using data-bs-title for the tooltip text
  const replacement = `<span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${definitions[term]}">$1</span>`;

  mainHTML = mainHTML.replace(pattern, replacement);
}

// Update <main> HTML
mainEl.innerHTML = mainHTML;

// 3. Activate all tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach(el => {
  new bootstrap.Tooltip(el);
});

