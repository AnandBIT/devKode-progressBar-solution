{
	const button = document.querySelector('button');
	const box = document.querySelector('.box');
	const main = document.querySelector('main');
	let numberOfClicks = 0;

	const el = `<div class="box" data-id='%id'>
<div class="progress-bar-wrapper">
	<div
		class="progress-bar"
		ontransitionend="startAnimation(event.currentTarget.parentNode.parentNode.dataset.id)"
	></div>
</div>
</div>`;

	const handleClick = async (e) => {
		numberOfClicks++;
		button.textContent = `Run ${numberOfClicks}`;
		if (numberOfClicks > 1) {
			const newEl = el.replace('%id', numberOfClicks);
			main.insertAdjacentHTML('beforeend', newEl);
		}

		/*******************************************************************************
			If there is no animation going on and still a progress-bar is created,
			then fill that newly bar
		*******************************************************************************/
		if (document.getAnimations().length === 0) {
			startAnimation(numberOfClicks - 1);
		}
	};

	button.addEventListener('click', handleClick);
}

const startAnimation = (boxId) => {
	console.clear();
	boxId++;

	// Setting the time obtained by the input box or by default, it is set to 1s
	const time = parseInt(document.getElementById('time').value) || 1;

	const element = document.querySelector(`.box[data-id="${boxId}"]`);
	if (element) {
		console.log(`Progress bar with ID: ${boxId} is filling now`);
		const progressBar = element.querySelector('.progress-bar');
		progressBar.style.transitionDuration = `${time}s`;
		progressBar.style.width = '100%';
	}
};
