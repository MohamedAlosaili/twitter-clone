export default (user, code) => `
<div
      style="
        max-width: 450px;
        margin: 0 auto;
        padding: 1.5rem;
        font-family: 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
      "
    >
      <header>
        <img
          src="https://ci3.googleusercontent.com/proxy/iN3k0ZioCk2xgkiOAklhQuRzOIm0f8AUFtLt9RS98-9NcfPVeGhBW2WyxnUFoFmHnhbVHMPxVhIHhcIsDnHPQ7Gbjnwfh6V2yeUOUkfI7KKmClNs7bL5S0_34um3ivFX7A=s0-d-e1-ft#https://ea.twimg.com/email/self_serve/media/Twitter_logo_180-1468901451975.png"
          style="width: 2rem; margin-left: auto; display: block"
        />
      </header>
      <main>
        <h2 style="margin: 0.75rem 0">Reset your password?</h2>
        <p style="line-height: 20px">
          If you requested a password reset for @${user.username}, use the
          confirmation code below to complete the process. If you didn't make
          this request, ignore this email.
        </p>
        <br />
        <p style="font-size: 0.875rem"><strong>${code}</strong></p>
        <br />
        <h3 style="margin: 0.75rem 0">
          Getting a lot of password reset emails?
        </h3>
        <p style="line-height: 20px">
          You can change your
          <a href="#" style="text-decoration: none; color: #1da1f2"
            >account settings</a
          >
          to require personal information to reset your password.
        </p>
        <p style="text-align: center; margin-top: 4.5rem">
          <a
            href="#"
            style="
              text-decoration: none;
              color: #1da1f2;
              font-size: 0.75rem;
              font-weight: 600;
            "
            >Help</a
          >
          |
          <a
            href="#"
            style="
              text-decoration: none;
              color: #1da1f2;
              font-size: 0.75rem;
              font-weight: 600;
            "
            >Not my account</a
          >
          |
          <a
            href="#"
            style="
              text-decoration: none;
              color: #1da1f2;
              font-size: 0.75rem;
              font-weight: 600;
            "
            >Email security tips</a
          >
        </p>
        <div style="font-size: 0.75rem; color: #8899a6; text-align: center">
          <p>
            <span>This email was meant for @${user.username}</span>
          </p>
          <p>
            Twitter, Inc. 1355 Market Street, Suite 900 San Francisco, CA 94103
          </p>
        </div>
      </main>
    </div>
`;
