document.addEventListener('DOMContentLoaded', function() {
  const errorModal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  // Add .hidden class to error modal initially
  errorModal.classList.add('hidden');

  // Define heart characters
  const EMPTY_HEART = '♡';
  const FULL_HEART = '♥';

  // Function to handle like click event
  function handleLikeClick(event) {
    const heart = event.target;

    // Simulate server call
    mimicServerCall()
      .then(() => {
        // Simulated server returns success
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART; // Change heart to full
          heart.classList.add('activated-heart'); // Add activated-heart class
        } else {
          heart.textContent = EMPTY_HEART; // Change heart back to empty
          heart.classList.remove('activated-heart'); // Remove activated-heart class
        }
      })
      .catch((error) => {
        // Simulated server returns failure
        modalMessage.textContent = `Error: ${error}`; // Display error message
        errorModal.classList.remove('hidden'); // Show error modal
        setTimeout(() => {
          errorModal.classList.add('hidden'); // Hide error modal after 3 seconds
        }, 3000);
      });
  }

  // Add event listener to handle clicks on like-glyph (empty heart)
  document.querySelectorAll('.like-glyph').forEach(function(heart) {
    heart.addEventListener('click', function(event) {
      handleLikeClick(event);
    });
  });
});

// Function to mimic server call (replace with actual server call)
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
