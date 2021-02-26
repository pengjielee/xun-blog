document.addEventListener('DOMContentLoaded', () => {
	var html = document.querySelector('html');
	var toggle = document.querySelector('#toggle');

	if (localStorage.getItem('theme') === 'dark-mode') {
	  html.setAttribute('theme','dark-mode');
	}

	toggle.addEventListener('click',() => {
		var theme = html.getAttribute('theme') || '';
		if(theme && theme === 'dark-mode') {
			html.setAttribute('theme','');
		} else {
			html.setAttribute('theme','dark-mode');
		}
		localStorage.setItem('theme', html.getAttribute('theme'));
	});
});