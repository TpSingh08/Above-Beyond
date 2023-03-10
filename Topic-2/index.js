const lightSelect = document.getElementById('light-select');
const colorPicker = document.getElementById('color-picker');

lightSelect.addEventListener('change', () => {
  const selectedLight = document.getElementById(lightSelect.value);
  selectedLight.style.backgroundColor = colorPicker.value;
});

colorPicker.addEventListener('input', () => {
  const selectedLight = document.getElementById(lightSelect.value);
  selectedLight.style.backgroundColor = colorPicker.value;
});
