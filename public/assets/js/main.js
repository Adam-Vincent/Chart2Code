(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Upload img
   */

  const fileInput = document.getElementById('file-input');
  const uploadForm = document.getElementById('upload-form');
  const contentContainer = document.getElementById('content-container');
  const uploadedImage = document.getElementById('uploaded-image');
  const editor = document.getElementById('editor');
  const imagePreview = document.getElementById("image-preview");
  const saveButton = document.getElementById('save-button');

  uploadForm.addEventListener('submit', async (event) => {

    event.preventDefault();
    const formData = new FormData(uploadForm);

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";  // This will show the image preview when an image is loaded
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.style.display = "none";  // This will hide the image preview if no image is loaded
    }

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    vegaEmbed('#vis', data.json_data);
    editor.value = JSON.stringify(data.json_data, null, 2);
    contentContainer.style.display = 'block';
  });


  saveButton.addEventListener('click', async () => {
    const new_specification = JSON.parse(editor.value);
    vegaEmbed('#vis', new_specification);
  });
})()