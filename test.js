const button = document.querySelector('button');
const box = document.querySelector('.box');
const main = document.querySelector('main');
const bar = box.querySelector('.progress-bar');
const inputBox = document.getElementById('time');
const desc = document.querySelector('p');

let start;
bar.style.width = '0%';
let animationCount = 0;

const startAnimation = (timestamp) => {
	if (!start) {
		console.time('Consumed Time');
		start = timestamp;
	}
	const time = inputBox.value || 1;
	const widthPerFrame = 100 / (time * 60);
	const temp = parseFloat(bar.style.width) + widthPerFrame;
	if (temp > 100) {
		bar.style.width = '0%';
		console.log(`END OF ANIMATION ${animationCount}`);
		animationCount--;
		if (animationCount <= 0) {
			// Resetting the UI
			button.textContent = `Run`;
			button.style.cursor = 'pointer';
			button.disabled = false;
			inputBox.disabled = false;
			desc.textContent = '';
			console.log(
				'-------------------END OF ALL ANIMATIONS-------------------'
			);
			console.timeEnd('Consumed Time');
			console.log('\n\n');
			return;
		} else {
			// New Bar is going to fill-up (i.e new animation)
			requestAnimationFrame(startAnimation);

			/*************************************************************
			   Disabling the user interaction with the input box
			   and the Run button when the animation is still going on.

			   The interaction of the user is going to be disabled with the button
			   only when at least one of the animation was completed.
			   Till one animation completeion, he/she can increase the number of animations.
			*************************************************************/
			button.style.cursor = 'not-allowed';
			button.disabled = true;

			button.textContent = `Run ${animationCount}`;
			desc.textContent = `Queue : ${animationCount}`;
		}
		return;
	}
	bar.style.width = `${temp}%`;
	requestAnimationFrame(startAnimation);
};

const handleClick = (e) => {
	animationCount++;
	e.currentTarget.textContent = `Run ${animationCount}`;
	desc.textContent = `Queue : ${animationCount}`;
	if (animationCount === 1) {
		/*************************************************************
			Disabling the user interaction with the input box
			when the animation is still going on.
		*************************************************************/
		inputBox.disabled = true;

		start = null;
		requestAnimationFrame(startAnimation);
	}
};

button.addEventListener('click', handleClick);
