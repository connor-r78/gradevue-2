export default function Index() {
  return (
  <>
  <header>
    <div class="container header-content">
      <h1 id="site-title">GradeVue 2</h1>
      <p id="site-tagline">A better way to view your grades on StudentVue</p>
      <div class="cta-buttons">
        <a href="login" class="btn btn-primary">Login</a>
      </div>
    </div>
  </header>

  <main>
    <section class="features container">
      <div class="feature-card">
        <h2>Grade Calculator</h2>
        <p>Use Hypothetical Mode to estimate your future scores and see how each assignment affects your overall grade.</p>
      </div>

      <div class="feature-card">
        <h2>Shows Hidden Assignments</h2>
        <p>Reveal hidden assignments and include them in your grade calculations so your averages are accurate.</p>
      </div>

      <div class="feature-card">
        <h2>Private Login</h2>
        <p>Your credentials are never stored — everything connects directly to StudentVue.</p>
      </div>

      <div class="feature-card">
        <h2>Attendance & More</h2>
        <p>Break down attendance, view report cards, documents, and messages all in one place.</p>
      </div>
    </section>
  </main>

  <footer>
    <p>© 2025 Connor Rakov. Licensed under the GNU GPLv3.</p>
  </footer>
  </>
  );
}
