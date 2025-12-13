/*
  Function to render the footer content into the page

  This function dynamically injects the footer HTML into
  the <div id="footer"> element. The footer includes:
  - Hospital logo and copyright
  - Company links
  - Support links
  - Legal links
*/

function renderFooter() {
  /* Select the footer container */
  const footer = document.getElementById("footer");
  if (!footer) return;

  /* Inject footer HTML content */
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">

        <div class="footer-logo">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
          <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>

        <div class="footer-links">

          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>

          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>

        </div>
      </div>
    </footer>
  `;
}

/* Render footer when script loads */
renderFooter();
