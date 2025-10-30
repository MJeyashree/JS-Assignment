const DEFAULT_TEMPLATES = [
  'https://picsum.photos/seed/meme1/200/200',
  'https://picsum.photos/seed/meme2/200/200'
];

const templatesEl = document.getElementById('templates');
const memesEl = document.getElementById('memes');
const captionInput = document.getElementById('captionInput');
const addMemeBtn = document.getElementById('addMeme');
const uploadTemplate = document.getElementById('uploadTemplate');

let templates = DEFAULT_TEMPLATES.slice();
// Ensure the first item is the selected one upon initialization
let selectedTemplate = templates.length > 0 ? templates[0] : null; 
let memes = [];

function renderTemplates() {
  templatesEl.innerHTML = '';
  templates.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    // Check for selected template safely
    if (selectedTemplate && src === selectedTemplate) img.classList.add('selected'); 
    img.onclick = () => {
      selectedTemplate = src;
      renderTemplates();
    };
    templatesEl.appendChild(img);
  });
}

function renderMemes() {
  memesEl.innerHTML = '';
  memes.forEach((meme, i) => {
    const div = document.createElement('div');
    div.className = 'meme';

    const img = document.createElement('img');
    img.src = meme.template;

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = meme.caption || '';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'meme-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newCaption = prompt('Edit caption:', meme.caption);
      if (newCaption !== null) { // Allow empty string to clear caption
        meme.caption = newCaption.trim();
        renderMemes();
      }
    };


    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      if (confirm('Delete this meme?')) {
        memes.splice(i, 1);
        renderMemes();
      }
    };

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);
    div.appendChild(img);
    div.appendChild(caption);
    div.appendChild(btnContainer);
    memesEl.appendChild(div);
  });
}


addMemeBtn.onclick = () => {
  if (!selectedTemplate) { // Safety check in case templates array is somehow empty
    alert('Please select or upload a template!');
    return;
  }
  const caption = captionInput.value.trim();
  if (!caption) {
    alert('Please enter a caption!');
    return;
  }
  memes.push({ template: selectedTemplate, caption });
  captionInput.value = '';
  renderMemes();
};

uploadTemplate.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const src = ev.target.result;
    templates.unshift(src);
    selectedTemplate = src;
    renderTemplates();
  };
  reader.readAsDataURL(file);
};

// Initialize
renderTemplates();
renderMemes();