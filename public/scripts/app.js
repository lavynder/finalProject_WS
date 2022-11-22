// IIFE --> Immediately invoked function expression
(function () {
    function Start() {
        console.log("App Started");
        
        // IF THE USER WANTS TO DELETE SOMETHING, 
        // THE WEBSITE ASKS THE USER FOR CONFIRMATION
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if (!confirm('Are you sure?')) {
                    event.preventDefault();
                    window.location.assign('/monster-list');
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();