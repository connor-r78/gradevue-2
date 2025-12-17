export default function Login() {
  return (
  <>
  <header>
    <div class = "container header-content">
      <h1 id = "site-title">GradeVue 2</h1>
      <p id = "site-tagline">Login to access your grades</p>
    </div>
  </header>

  <main>
    <section id = "login-section" class = "container">
      <div class = "login-card">
        <h2>Sign In</h2>
        <form id = "login-form">
          <input type = "text" id = "username" name = "username" required/>
          <input type = "password" id = "password" name = "password" required/>
          <br/>
          <div class = "cta-buttons">
            <button type = "submit" class = "btn-primary">Login</button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <footer id = "footer" >
    <p>© 2025 Connor Rakov. Licensed under the GNU GPLv3.</p>
  </footer>
  </>
  );
}
