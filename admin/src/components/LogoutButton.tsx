'use client';

export function LogoutButton() {
  return (
    <form
      action="/api/auth/logout"
      method="post"
      onSubmit={(e) => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (!confirmed) e.preventDefault();
      }}
    >
      <button className="btn-secondary w-full sm:w-auto" type="submit">
        Logout
      </button>
    </form>
  );
}
